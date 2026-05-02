import { Injectable } from '@nestjs/common';
import { MapperInterface } from '../../common/interfaces/mapper.interface';
import { BookingResponseDto } from '../dto/booking-response.dto';
import { Booking } from '../entities/booking.entity';
import { CreateBookingData } from '../types/create-booking-data.type';

@Injectable()
export class BookingMapper implements MapperInterface<
  CreateBookingData,
  CreateBookingData,
  Booking,
  BookingResponseDto
> {
  toPersistence(input: CreateBookingData): CreateBookingData {
    return input;
  }

  toResponse(entity: Booking): BookingResponseDto {
    return {
      id: entity.id,
      userId: entity.userId,
      fitnessClassId: entity.fitnessClassId,
      status: entity.status,
      classTitle: entity.fitnessClass.title,
      classStartTime: entity.fitnessClass.startTime,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
