import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';

export class FindFitnessClassesQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  instructorId?: number;

  @IsOptional()
  @IsDateString()
  date?: string;
}
