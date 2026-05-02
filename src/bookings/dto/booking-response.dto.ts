import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '../entities/booking.entity';

export class BookingResponseDto {
  @ApiProperty({ example: 10 })
  id!: number;

  @ApiProperty({ example: 3 })
  userId!: number;

  @ApiProperty({ example: 1 })
  fitnessClassId!: number;

  @ApiProperty({ enum: BookingStatus, example: BookingStatus.CONFIRMED })
  status!: BookingStatus;

  @ApiProperty({ example: 'Morning HIIT' })
  classTitle!: string;

  @ApiProperty({ example: '2026-05-10T09:00:00.000Z' })
  classStartTime!: Date;

  @ApiProperty({ example: '2026-05-02T10:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-05-02T10:00:00.000Z' })
  updatedAt!: Date;
}
