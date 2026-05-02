import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Ana' })
  name!: string;

  @ApiProperty({ example: 'Lopez' })
  lastName!: string;

  @ApiProperty({ example: '12345678' })
  dni!: string;

  @ApiProperty({ example: 'ana@example.com' })
  email!: string;

  @ApiProperty({ example: '1995-04-10T00:00:00.000Z', nullable: true })
  birthday!: Date | null;

  @ApiProperty({ example: '2026-05-02T10:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-05-02T10:00:00.000Z' })
  updatedAt!: Date;
}
