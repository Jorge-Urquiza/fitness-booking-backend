import { BookingStatus } from '../entities/booking.entity';

export class BookingResponseDto {
  id!: number;
  userId!: number;
  fitnessClassId!: number;
  status!: BookingStatus;
  classTitle!: string;
  classStartTime!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
