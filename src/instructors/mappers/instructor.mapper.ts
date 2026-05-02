import { Injectable } from '@nestjs/common';
import { MapperInterface } from '../../common/interfaces/mapper.interface';
import { CreateInstructorData } from '../types/create-instructor-data.type';
import { Instructor } from '../entities/instructor.entity';
import { CreateInstructorDto } from '../dto/create-instructor.dto';
import { InstructorListItemDto } from '../dto/instructor-list-item.dto';
import { InstructorResponseDto } from '../dto/instructor-response.dto';

@Injectable()
export class InstructorMapper implements MapperInterface<
  CreateInstructorDto,
  CreateInstructorData,
  Instructor,
  InstructorResponseDto
> {
  toPersistence(dto: CreateInstructorDto): CreateInstructorData {
    return {
      name: dto.name,
      lastName: dto.lastName,
      dni: dto.dni,
    };
  }

  toResponse(entity: Instructor): InstructorResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      lastName: entity.lastName,
      dni: entity.dni,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toListItem(entity: Instructor): InstructorListItemDto {
    return {
      id: entity.id,
      name: entity.name,
      dni: entity.dni,
    };
  }
}
