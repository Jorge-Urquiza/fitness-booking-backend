import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { MapperInterface } from '../../common/interfaces/mapper.interface';
import { User } from '../../users/entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { UserResponseDto } from '../dto/user-response.dto';

type CreateUserInput = RegisterDto & { passwordHash: string };

@Injectable()
export class AuthUserMapper implements MapperInterface<
  CreateUserInput,
  DeepPartial<User>,
  UserResponseDto
> {
  toPersistence(input: CreateUserInput): DeepPartial<User> {
    return {
      name: input.name.trim(),
      lastName: input.lastName.trim(),
      dni: input.dni.trim(),
      email: this.normalizeEmail(input.email),
      birthday: input.birthday ? new Date(input.birthday) : null,
      passwordHash: input.passwordHash,
    };
  }

  toResponse(user: DeepPartial<User>): UserResponseDto {
    return {
      id: user.id as number,
      name: user.name as string,
      lastName: user.lastName as string,
      dni: user.dni as string,
      email: user.email as string,
      birthday: (user.birthday as Date | null) ?? null,
      createdAt: user.createdAt as Date,
      updatedAt: user.updatedAt as Date,
    };
  }

  normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
}
