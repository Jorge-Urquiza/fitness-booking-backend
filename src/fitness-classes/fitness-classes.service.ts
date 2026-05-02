import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Instructor } from '../instructors/entities/instructor.entity';
import { FITNESS_CLASSES_ERRORS } from './constants/fitness-classes.constants';
import { CreateFitnessClassDto } from './dto/create-fitness-class.dto';
import { FindFitnessClassesQueryDto } from './dto/find-fitness-classes-query.dto';
import { FitnessClassResponseDto } from './dto/fitness-class-response.dto';
import { FitnessClass } from './entities/fitness-class.entity';
import { FitnessClassMapper } from './mappers/fitness-class.mapper';

@Injectable()
export class FitnessClassesService {
  constructor(
    @InjectRepository(FitnessClass)
    private readonly fitnessClassesRepository: Repository<FitnessClass>,
    @InjectRepository(Instructor)
    private readonly instructorsRepository: Repository<Instructor>,
    private readonly fitnessClassMapper: FitnessClassMapper,
  ) {}

  async create(dto: CreateFitnessClassDto): Promise<FitnessClassResponseDto> {
    const instructor = await this.instructorsRepository.findOne({
      where: { id: dto.instructorId, deletedAt: IsNull() },
    });

    if (!instructor) {
      throw new NotFoundException(FITNESS_CLASSES_ERRORS.INSTRUCTOR_NOT_FOUND);
    }

    const newClass = this.fitnessClassesRepository.create(
      this.fitnessClassMapper.toPersistence(dto),
    );

    const savedClass = await this.fitnessClassesRepository.save(newClass);
    return this.fitnessClassMapper.toResponse(savedClass);
  }

  async findAll(
    query: FindFitnessClassesQueryDto,
  ): Promise<FitnessClassResponseDto[]> {
    const queryBuilder = this.fitnessClassesRepository
      .createQueryBuilder('fitnessClass')
      .where('fitnessClass.deletedAt IS NULL');

    if (query.instructorId) {
      queryBuilder.andWhere('fitnessClass.instructorId = :instructorId', {
        instructorId: query.instructorId,
      });
    }

    if (query.date) {
      queryBuilder.andWhere('DATE(fitnessClass.startTime) = :date', {
        date: query.date,
      });
    }

    const classes = await queryBuilder
      .orderBy('fitnessClass.startTime', 'ASC')
      .addOrderBy('fitnessClass.id', 'ASC')
      .getMany();

    return classes.map((fitnessClass) =>
      this.fitnessClassMapper.toResponse(fitnessClass),
    );
  }

  async findOne(id: number): Promise<FitnessClassResponseDto> {
    const fitnessClass = await this.fitnessClassesRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!fitnessClass) {
      throw new NotFoundException(FITNESS_CLASSES_ERRORS.CLASS_NOT_FOUND);
    }

    return this.fitnessClassMapper.toResponse(fitnessClass);
  }
}
