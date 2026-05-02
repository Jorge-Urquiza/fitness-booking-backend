import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { InstructorListItemDto } from './dto/instructor-list-item.dto';
import { InstructorResponseDto } from './dto/instructor-response.dto';
import { InstructorsService } from './instructors.service';

@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Post()
  create(@Body() dto: CreateInstructorDto): Promise<InstructorResponseDto> {
    return this.instructorsService.create(dto);
  }

  @Get()
  findAll(): Promise<InstructorListItemDto[]> {
    return this.instructorsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InstructorResponseDto> {
    return this.instructorsService.findOne(id);
  }
}
