/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/unbound-method */
/// <reference types="jest" />
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { BOOKINGS_ERRORS } from './constants/bookings.constants';
import { Booking, BookingStatus } from './entities/booking.entity';
import { BookingsService } from './bookings.service';
import { BookingMapper } from './mappers/booking.mapper';

describe('BookingsService', () => {
  const bookingsRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
  } as unknown as Repository<Booking>;

  const managerBookingRepository = {
    findOne: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const classQueryBuilder = {
    setLock: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getOne: jest.fn(),
  };

  const managerFitnessClassRepository = {
    createQueryBuilder: jest.fn().mockReturnValue(classQueryBuilder),
  };

  const manager = {
    getRepository: jest.fn(),
  };

  const dataSource = {
    transaction: jest.fn(),
  } as unknown as DataSource;

  const bookingMapper = {
    toResponse: jest.fn(),
  } as unknown as BookingMapper;

  const service = new BookingsService(
    dataSource,
    bookingsRepository,
    bookingMapper,
  );

  const makeUser = (id: number): User => ({ id }) as User;

  beforeEach(() => {
    jest.clearAllMocks();
    manager.getRepository = jest.fn((entity) => {
      if (entity === Booking) {
        return managerBookingRepository;
      }
      return managerFitnessClassRepository;
    });
    (dataSource.transaction as jest.Mock).mockImplementation(async (cb) =>
      cb(manager),
    );
  });

  it('books a future class when capacity is available', async () => {
    const user = makeUser(10);
    const savedBooking = {
      id: 100,
      userId: user.id,
      fitnessClassId: 1,
      status: BookingStatus.CONFIRMED,
    } as Booking;
    const bookingWithClass = {
      ...savedBooking,
      fitnessClass: { id: 1, startTime: new Date(Date.now() + 60_000) },
    } as unknown as Booking;
    const responseDto = { id: 100 };

    classQueryBuilder.getOne.mockResolvedValue({
      id: 1,
      capacity: 20,
      startTime: new Date(Date.now() + 60 * 60 * 1000),
    });
    managerBookingRepository.findOne.mockResolvedValue(null);
    managerBookingRepository.count.mockResolvedValue(3);
    managerBookingRepository.create.mockReturnValue(savedBooking);
    managerBookingRepository.save.mockResolvedValue(savedBooking);
    (bookingsRepository.findOne as jest.Mock).mockResolvedValue(
      bookingWithClass,
    );
    (bookingMapper.toResponse as jest.Mock).mockReturnValue(responseDto);

    const result = await service.bookClass(1, user);

    expect(result).toEqual(responseDto);
    expect(managerBookingRepository.create).toHaveBeenCalledWith({
      userId: 10,
      fitnessClassId: 1,
      status: BookingStatus.CONFIRMED,
    });
    expect(managerBookingRepository.save).toHaveBeenCalled();
    expect(bookingsRepository.findOne).toHaveBeenCalledWith({
      where: { id: 100, deletedAt: IsNull() },
      relations: { fitnessClass: true },
    });
  });

  it('rejects booking when class does not exist', async () => {
    classQueryBuilder.getOne.mockResolvedValue(null);

    await expect(service.bookClass(99, makeUser(10))).rejects.toThrow(
      new NotFoundException(BOOKINGS_ERRORS.CLASS_NOT_FOUND),
    );
  });

  it('rejects booking a past class', async () => {
    classQueryBuilder.getOne.mockResolvedValue({
      id: 1,
      capacity: 10,
      startTime: new Date(Date.now() - 60_000),
    });

    await expect(service.bookClass(1, makeUser(10))).rejects.toThrow(
      new ConflictException(BOOKINGS_ERRORS.CLASS_ALREADY_STARTED),
    );
  });

  it('rejects duplicate active booking', async () => {
    classQueryBuilder.getOne.mockResolvedValue({
      id: 1,
      capacity: 10,
      startTime: new Date(Date.now() + 60_000),
    });
    managerBookingRepository.findOne.mockResolvedValue({
      id: 50,
      status: BookingStatus.CONFIRMED,
      userId: 10,
      fitnessClassId: 1,
    });

    await expect(service.bookClass(1, makeUser(10))).rejects.toThrow(
      new ConflictException(BOOKINGS_ERRORS.DUPLICATE_BOOKING),
    );
  });

  it('rejects booking when class is full', async () => {
    classQueryBuilder.getOne.mockResolvedValue({
      id: 1,
      capacity: 2,
      startTime: new Date(Date.now() + 60_000),
    });
    managerBookingRepository.findOne.mockResolvedValue(null);
    managerBookingRepository.count.mockResolvedValue(2);

    await expect(service.bookClass(1, makeUser(10))).rejects.toThrow(
      new ConflictException(BOOKINGS_ERRORS.CLASS_FULL),
    );
  });

  it('cancels own booking', async () => {
    const booking = {
      id: 1,
      userId: 10,
      status: BookingStatus.CONFIRMED,
      fitnessClass: { startTime: new Date(Date.now() + 120_000) },
    } as unknown as Booking;
    const cancelledBooking = { ...booking, status: BookingStatus.CANCELLED };
    const responseDto = { id: 1, status: BookingStatus.CANCELLED };

    (bookingsRepository.findOne as jest.Mock).mockResolvedValue(booking);
    (bookingsRepository.save as jest.Mock).mockResolvedValue(cancelledBooking);
    (bookingMapper.toResponse as jest.Mock).mockReturnValue(responseDto);

    const result = await service.cancelBooking(1, makeUser(10));

    expect(result).toEqual(responseDto);
    expect(bookingsRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ status: BookingStatus.CANCELLED }),
    );
  });

  it("rejects canceling another user's booking", async () => {
    (bookingsRepository.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      userId: 999,
      status: BookingStatus.CONFIRMED,
      fitnessClass: { startTime: new Date(Date.now() + 120_000) },
    });

    await expect(service.cancelBooking(1, makeUser(10))).rejects.toThrow(
      new ForbiddenException(BOOKINGS_ERRORS.FORBIDDEN_CANCEL),
    );
  });

  it('rejects canceling an already cancelled booking', async () => {
    (bookingsRepository.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      userId: 10,
      status: BookingStatus.CANCELLED,
      fitnessClass: { startTime: new Date(Date.now() + 120_000) },
    });

    await expect(service.cancelBooking(1, makeUser(10))).rejects.toThrow(
      new ConflictException(BOOKINGS_ERRORS.BOOKING_ALREADY_CANCELLED),
    );
  });

  it('rejects canceling after class has started', async () => {
    (bookingsRepository.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      userId: 10,
      status: BookingStatus.CONFIRMED,
      fitnessClass: { startTime: new Date(Date.now() - 120_000) },
    });

    await expect(service.cancelBooking(1, makeUser(10))).rejects.toThrow(
      new ConflictException(BOOKINGS_ERRORS.CLASS_ALREADY_STARTED),
    );
  });

  it("returns only current user's bookings", async () => {
    const bookingOne = {
      id: 1,
      userId: 10,
      fitnessClass: { id: 100 },
    } as unknown as Booking;
    const bookingTwo = {
      id: 2,
      userId: 10,
      fitnessClass: { id: 200 },
    } as unknown as Booking;

    (bookingsRepository.find as jest.Mock).mockResolvedValue([
      bookingOne,
      bookingTwo,
    ]);
    (bookingMapper.toResponse as jest.Mock)
      .mockReturnValueOnce({ id: 1 })
      .mockReturnValueOnce({ id: 2 });

    const result = await service.findMyBookings(makeUser(10));

    expect(bookingsRepository.find).toHaveBeenCalledWith({
      where: { userId: 10, deletedAt: IsNull() },
      relations: { fitnessClass: true },
      order: { createdAt: 'DESC', id: 'DESC' },
    });
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
