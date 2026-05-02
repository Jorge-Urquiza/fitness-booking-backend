export class UserResponseDto {
  id!: number;
  name!: string;
  lastName!: string;
  dni!: string;
  email!: string;
  birthday!: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}
