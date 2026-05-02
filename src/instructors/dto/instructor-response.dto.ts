import { ApiProperty } from '@nestjs/swagger';

export class InstructorResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Luis' })
  name!: string;

  @ApiProperty({ example: 'Perez' })
  lastName!: string;

  @ApiProperty({ example: '3312345' })
  dni!: string;

  @ApiProperty({ example: '2026-05-02T10:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-05-02T10:00:00.000Z' })
  updatedAt!: Date;
}
