import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { InstructorsController } from './instructors.controller';
import { InstructorsService } from './instructors.service';
import { InstructorMapper } from './mappers/instructor.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Instructor])],
  controllers: [InstructorsController],
  providers: [InstructorsService, InstructorMapper],
})
export class InstructorsModule {}
