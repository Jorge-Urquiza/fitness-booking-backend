import { Injectable } from '@nestjs/common';
import { MapperInterface } from '../../common/interfaces/mapper.interface';
import { CreateFitnessClassDto } from '../dto/create-fitness-class.dto';
import { FitnessClassResponseDto } from '../dto/fitness-class-response.dto';
import { FitnessClass } from '../entities/fitness-class.entity';
import { CreateFitnessClassData } from '../types/create-fitness-class-data.type';

@Injectable()
export class FitnessClassMapper implements MapperInterface<
  CreateFitnessClassDto,
  CreateFitnessClassData,
  FitnessClass,
  FitnessClassResponseDto
> {
  toPersistence(dto: CreateFitnessClassDto): CreateFitnessClassData {
    return {
      title: dto.title,
      description: dto.description ?? null,
      instructorId: dto.instructorId,
      startTime: new Date(dto.startTime),
      capacity: dto.capacity,
    };
  }

  toResponse(entity: FitnessClass): FitnessClassResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      instructorId: entity.instructorId,
      startTime: entity.startTime,
      capacity: entity.capacity,
    };
  }
}
