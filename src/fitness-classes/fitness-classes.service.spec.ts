/// <reference types="jest" />
import { NotFoundException } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { BookingStatus } from '../bookings/entities/booking.entity';
import { FITNESS_CLASSES_ERRORS } from './constants/fitness-classes.constants';
import { FitnessClassesService } from './fitness-classes.service';
import { FitnessClassMapper } from './mappers/fitness-class.mapper';

describe('FitnessClassesService availability', () => {
  const fitnessClassesRepository = {
    findOne: jest.fn(),
  } as unknown as Repository<any>;
  const instructorsRepository = {} as Repository<any>;
  const bookingsRepository = {
    count: jest.fn(),
  } as unknown as Repository<any>;
  const mapper = {} as FitnessClassMapper;

  const service = new FitnessClassesService(
    fitnessClassesRepository,
    instructorsRepository,
    bookingsRepository,
    mapper,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns full availability when class has no bookings', async () => {
    (fitnessClassesRepository.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      capacity: 20,
    });
    (bookingsRepository.count as jest.Mock).mockResolvedValue(0);

    const result = await service.findAvailability(1);

    expect(result).toEqual({
      classId: 1,
      capacity: 20,
      confirmedBookings: 0,
      availableSpots: 20,
    });
  });

  it('returns reduced availability when class has confirmed bookings', async () => {
    (fitnessClassesRepository.findOne as jest.Mock).mockResolvedValue({
      id: 2,
      capacity: 20,
    });
    (bookingsRepository.count as jest.Mock).mockResolvedValue(7);

    const result = await service.findAvailability(2);

    expect(result).toEqual({
      classId: 2,
      capacity: 20,
      confirmedBookings: 7,
      availableSpots: 13,
    });
    expect(bookingsRepository.count).toHaveBeenCalledWith({
      where: {
        fitnessClassId: 2,
        status: BookingStatus.CONFIRMED,
        deletedAt: IsNull(),
      },
    });
  });

  it('ignores cancelled bookings by counting only confirmed bookings', async () => {
    (fitnessClassesRepository.findOne as jest.Mock).mockResolvedValue({
      id: 3,
      capacity: 10,
    });
    (bookingsRepository.count as jest.Mock).mockResolvedValue(4);

    const result = await service.findAvailability(3);

    expect(result.confirmedBookings).toBe(4);
    expect(result.availableSpots).toBe(6);
    expect(bookingsRepository.count).toHaveBeenCalledWith({
      where: {
        fitnessClassId: 3,
        status: BookingStatus.CONFIRMED,
        deletedAt: IsNull(),
      },
    });
  });

  it('throws NotFoundException for non-existing class', async () => {
    (fitnessClassesRepository.findOne as jest.Mock).mockResolvedValue(null);

    await expect(service.findAvailability(999)).rejects.toThrow(
      new NotFoundException(FITNESS_CLASSES_ERRORS.CLASS_NOT_FOUND),
    );
  });
});
