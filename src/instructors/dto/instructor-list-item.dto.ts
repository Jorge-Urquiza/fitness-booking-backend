import { ApiProperty } from '@nestjs/swagger';

export class InstructorListItemDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'John Doe' })
  name!: string;

  @ApiProperty({ example: '87654321' })
  dni!: string;
}
