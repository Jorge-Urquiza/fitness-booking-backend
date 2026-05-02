import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FitnessClass } from '../../fitness-classes/entities/fitness-class.entity';

@Entity({ name: 'instructors' })
@Index('IDX_instructors_dni', ['dni'])
export class Instructor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 120 })
  name!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 120 })
  lastName!: string;

  @Column({ type: 'varchar', length: 30 })
  dni!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;

  @OneToMany(() => FitnessClass, (fitnessClass) => fitnessClass.instructor)
  fitnessClasses!: FitnessClass[];
}
