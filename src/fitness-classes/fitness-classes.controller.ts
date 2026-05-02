import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ClassAvailabilityResponseDto } from './dto/class-availability-response.dto';
import { CreateFitnessClassDto } from './dto/create-fitness-class.dto';
import { FindFitnessClassesQueryDto } from './dto/find-fitness-classes-query.dto';
import { FitnessClassResponseDto } from './dto/fitness-class-response.dto';
import { FitnessClassesService } from './fitness-classes.service';

@Controller('classes')
@ApiTags('Fitness classes', 'Availability')
export class FitnessClassesController {
  constructor(private readonly fitnessClassesService: FitnessClassesService) {}

  @Post()
  @ApiOperation({ summary: 'Create fitness class' })
  @ApiCreatedResponse({ type: FitnessClassResponseDto })
  create(@Body() dto: CreateFitnessClassDto): Promise<FitnessClassResponseDto> {
    return this.fitnessClassesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List fitness classes with optional filters' })
  @ApiOkResponse({ type: FitnessClassResponseDto, isArray: true })
  findAll(
    @Query() query: FindFitnessClassesQueryDto,
  ): Promise<FitnessClassResponseDto[]> {
    return this.fitnessClassesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get fitness class by id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: FitnessClassResponseDto })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FitnessClassResponseDto> {
    return this.fitnessClassesService.findOne(id);
  }

  @Get(':id/availability')
  @ApiOperation({ summary: 'Get class availability by class id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: ClassAvailabilityResponseDto })
  findAvailability(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClassAvailabilityResponseDto> {
    return this.fitnessClassesService.findAvailability(id);
  }
}
