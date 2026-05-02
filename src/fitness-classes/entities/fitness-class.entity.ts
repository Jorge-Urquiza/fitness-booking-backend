import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';
import { Instructor } from '../../instructors/entities/instructor.entity';

@Entity({ name: 'fitness_classes' })
@Index('IDX_fitness_classes_instructor_id', ['instructorId'])
export class FitnessClass {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'instructor_id', type: 'int' })
  instructorId!: number;

  @Column({ name: 'start_time', type: 'datetime' })
  startTime!: Date;

  @Column({ type: 'int' })
  capacity!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;

  @ManyToOne(() => Instructor, (instructor) => instructor.fitnessClasses, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'instructor_id' })
  instructor!: Instructor;

  @OneToMany(() => Booking, (booking) => booking.fitnessClass)
  bookings!: Booking[];
}
