import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';

export class FindFitnessClassesQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  instructorId?: number;

  @ApiPropertyOptional({ example: '2026-05-02' })
  @IsOptional()
  @IsDateString()
  date?: string;
}
