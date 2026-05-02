import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from '../instructors/entities/instructor.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { FitnessClassesController } from './fitness-classes.controller';
import { FitnessClassesService } from './fitness-classes.service';
import { FitnessClass } from './entities/fitness-class.entity';
import { FitnessClassMapper } from './mappers/fitness-class.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([FitnessClass, Instructor, Booking])],
  controllers: [FitnessClassesController],
  providers: [FitnessClassesService, FitnessClassMapper],
})
export class FitnessClassesModule {}
