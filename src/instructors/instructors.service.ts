import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { INSTRUCTORS_ERRORS } from './constants/instructors.constants';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { InstructorListItemDto } from './dto/instructor-list-item.dto';
import { InstructorResponseDto } from './dto/instructor-response.dto';
import { Instructor } from './entities/instructor.entity';
import { InstructorMapper } from './mappers/instructor.mapper';

@Injectable()
export class InstructorsService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorsRepository: Repository<Instructor>,
    private readonly instructorMapper: InstructorMapper,
  ) {}

  async create(dto: CreateInstructorDto): Promise<InstructorResponseDto> {
    const existingInstructor = await this.instructorsRepository.findOne({
      where: { dni: dto.dni, deletedAt: IsNull() },
    });
    if (existingInstructor) {
      throw new ConflictException(INSTRUCTORS_ERRORS.DUPLICATED_DNI);
    }

    const newInstructor = this.instructorsRepository.create(
      this.instructorMapper.toPersistence(dto),
    );
    const savedInstructor =
      await this.instructorsRepository.save(newInstructor);
    return this.instructorMapper.toResponse(savedInstructor);
  }

  async findAll(): Promise<InstructorListItemDto[]> {
    const instructors = await this.instructorsRepository.find({
      where: { deletedAt: IsNull() },
      order: { name: 'ASC', lastName: 'ASC' },
    });
    return instructors.map((instructor) =>
      this.instructorMapper.toListItem(instructor),
    );
  }

  async findOne(id: number): Promise<InstructorResponseDto> {
    const instructor = await this.instructorsRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!instructor) {
      throw new NotFoundException(INSTRUCTORS_ERRORS.NOT_FOUND);
    }
    return this.instructorMapper.toResponse(instructor);
  }
}
