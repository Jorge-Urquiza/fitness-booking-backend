import { ApiProperty } from '@nestjs/swagger';

export class FitnessClassResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Morning HIIT' })
  title!: string;

  @ApiProperty({ example: 'High intensity interval class', nullable: true })
  description!: string | null;

  @ApiProperty({ example: 1 })
  instructorId!: number;

  @ApiProperty({ example: '2026-05-10T09:00:00.000Z' })
  startTime!: Date;

  @ApiProperty({ example: 20 })
  capacity!: number;
}
