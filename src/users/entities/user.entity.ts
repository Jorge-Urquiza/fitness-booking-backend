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
import { Booking } from '../../bookings/entities/booking.entity';

@Entity({ name: 'users' })
@Index('UQ_users_email', ['email'], { unique: true })
@Index('IDX_users_dni', ['dni'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 120 })
  name!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 120 })
  lastName!: string;

  @Column({ type: 'varchar', length: 30 })
  dni!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'date', nullable: true })
  birthday!: Date | null;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings!: Booking[];
}
