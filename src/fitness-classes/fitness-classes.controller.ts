import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateFitnessClassDto } from './dto/create-fitness-class.dto';
import { FindFitnessClassesQueryDto } from './dto/find-fitness-classes-query.dto';
import { FitnessClassResponseDto } from './dto/fitness-class-response.dto';
import { ClassAvailabilityResponseDto } from './dto/class-availability-response.dto';
import { FitnessClassesService } from './fitness-classes.service';

@Controller('classes')
export class FitnessClassesController {
  constructor(private readonly fitnessClassesService: FitnessClassesService) {}

  @Post()
  create(@Body() dto: CreateFitnessClassDto): Promise<FitnessClassResponseDto> {
    return this.fitnessClassesService.create(dto);
  }

  @Get()
  findAll(
    @Query() query: FindFitnessClassesQueryDto,
  ): Promise<FitnessClassResponseDto[]> {
    return this.fitnessClassesService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FitnessClassResponseDto> {
    return this.fitnessClassesService.findOne(id);
  }

  @Get(':id/availability')
  findAvailability(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClassAvailabilityResponseDto> {
    return this.fitnessClassesService.findAvailability(id);
  }
}
