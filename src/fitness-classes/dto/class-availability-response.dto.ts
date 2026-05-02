import { ApiProperty } from '@nestjs/swagger';

export class ClassAvailabilityResponseDto {
  @ApiProperty({ example: 1 })
  classId!: number;

  @ApiProperty({ example: 20 })
  capacity!: number;

  @ApiProperty({ example: 7 })
  confirmedBookings!: number;

  @ApiProperty({ example: 13 })
  availableSpots!: number;
}
