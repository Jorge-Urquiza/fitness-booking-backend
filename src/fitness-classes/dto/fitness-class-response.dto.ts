export class FitnessClassResponseDto {
  id!: number;
  title!: string;
  description!: string | null;
  instructorId!: number;
  startTime!: Date;
  capacity!: number;
}
