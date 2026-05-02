import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FitnessClass } from '../../fitness-classes/entities/fitness-class.entity';
import { User } from '../../users/entities/user.entity';

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

@Entity({ name: 'bookings' })
@Index('IDX_bookings_user_id', ['userId'])
@Index('IDX_bookings_fitness_class_id', ['fitnessClassId'])
@Index('UQ_bookings_user_fitness_class', ['userId', 'fitnessClassId'], {
  unique: true,
})
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @Column({ name: 'fitness_class_id', type: 'int' })
  fitnessClassId!: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.CONFIRMED,
  })
  status!: BookingStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;

  @ManyToOne(() => User, (user) => user.bookings, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => FitnessClass, (fitnessClass) => fitnessClass.bookings, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'fitness_class_id' })
  fitnessClass!: FitnessClass;
}
