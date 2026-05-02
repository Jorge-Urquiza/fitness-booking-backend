import { BookingStatus } from '../entities/booking.entity';

export type CreateBookingData = {
  userId: number;
  fitnessClassId: number;
  status: BookingStatus;
};
