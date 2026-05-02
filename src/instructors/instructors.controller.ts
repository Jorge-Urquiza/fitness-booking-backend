import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { InstructorListItemDto } from './dto/instructor-list-item.dto';
import { InstructorResponseDto } from './dto/instructor-response.dto';
import { InstructorsService } from './instructors.service';

@Controller('instructors')
@ApiTags('Instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create instructor' })
  @ApiCreatedResponse({ type: InstructorResponseDto })
  create(@Body() dto: CreateInstructorDto): Promise<InstructorResponseDto> {
    return this.instructorsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List instructors' })
  @ApiOkResponse({ type: InstructorListItemDto, isArray: true })
  findAll(): Promise<InstructorListItemDto[]> {
    return this.instructorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get instructor by id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: InstructorResponseDto })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InstructorResponseDto> {
    return this.instructorsService.findOne(id);
  }
}
