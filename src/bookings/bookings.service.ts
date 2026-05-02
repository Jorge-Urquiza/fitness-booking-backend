import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { BOOKINGS_ERRORS } from './constants/bookings.constants';
import { BookingResponseDto } from './dto/booking-response.dto';
import { Booking, BookingStatus } from './entities/booking.entity';
import { BookingMapper } from './mappers/booking.mapper';
import { FitnessClass } from '../fitness-classes/entities/fitness-class.entity';

@Injectable()
export class BookingsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
    private readonly bookingMapper: BookingMapper,
  ) {}

  async bookClass(classId: number, user: User): Promise<BookingResponseDto> {
    const booking = await this.dataSource.transaction(async (manager) => {
      const fitnessClass = await manager
        .getRepository(FitnessClass)
        .createQueryBuilder('fitnessClass')
        .setLock('pessimistic_write')
        .where('fitnessClass.id = :classId', { classId })
        .andWhere('fitnessClass.deletedAt IS NULL')
        .getOne();

      if (!fitnessClass) {
        throw new NotFoundException(BOOKINGS_ERRORS.CLASS_NOT_FOUND);
      }

      if (fitnessClass.startTime <= new Date()) {
        throw new ConflictException(BOOKINGS_ERRORS.CLASS_ALREADY_STARTED);
      }

      const existingBooking = await manager.getRepository(Booking).findOne({
        where: {
          userId: user.id,
          fitnessClassId: fitnessClass.id,
          deletedAt: IsNull(),
        },
      });

      if (existingBooking?.status === BookingStatus.CONFIRMED) {
        throw new ConflictException(BOOKINGS_ERRORS.DUPLICATE_BOOKING);
      }

      const confirmedBookings = await manager.getRepository(Booking).count({
        where: {
          fitnessClassId: fitnessClass.id,
          status: BookingStatus.CONFIRMED,
          deletedAt: IsNull(),
        },
      });

      if (confirmedBookings >= fitnessClass.capacity) {
        throw new ConflictException(BOOKINGS_ERRORS.CLASS_FULL);
      }

      if (existingBooking) {
        existingBooking.status = BookingStatus.CONFIRMED;
        return manager.getRepository(Booking).save(existingBooking);
      }

      const newBooking = manager.getRepository(Booking).create({
        userId: user.id,
        fitnessClassId: fitnessClass.id,
        status: BookingStatus.CONFIRMED,
      });

      return manager.getRepository(Booking).save(newBooking);
    });

    const bookingWithClass = await this.bookingsRepository.findOne({
      where: { id: booking.id, deletedAt: IsNull() },
      relations: { fitnessClass: true },
    });

    if (!bookingWithClass) {
      throw new NotFoundException(BOOKINGS_ERRORS.BOOKING_NOT_FOUND);
    }

    return this.bookingMapper.toResponse(bookingWithClass);
  }

  async cancelBooking(id: number, user: User): Promise<BookingResponseDto> {
    const booking = await this.bookingsRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: { fitnessClass: true },
    });

    if (!booking) {
      throw new NotFoundException(BOOKINGS_ERRORS.BOOKING_NOT_FOUND);
    }

    if (booking.userId !== user.id) {
      throw new ForbiddenException(BOOKINGS_ERRORS.FORBIDDEN_CANCEL);
    }

    if (booking.status === BookingStatus.CANCELLED) {
      throw new ConflictException(BOOKINGS_ERRORS.BOOKING_ALREADY_CANCELLED);
    }

    if (booking.fitnessClass.startTime <= new Date()) {
      throw new ConflictException(BOOKINGS_ERRORS.CLASS_ALREADY_STARTED);
    }

    booking.status = BookingStatus.CANCELLED;
    const updatedBooking = await this.bookingsRepository.save(booking);

    return this.bookingMapper.toResponse(updatedBooking);
  }

  async findMyBookings(user: User): Promise<BookingResponseDto[]> {
    const bookings = await this.bookingsRepository.find({
      where: { userId: user.id, deletedAt: IsNull() },
      relations: { fitnessClass: true },
      order: { createdAt: 'DESC', id: 'DESC' },
    });

    return bookings.map((booking) => this.bookingMapper.toResponse(booking));
  }
}
