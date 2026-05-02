import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { CreateUserData } from '../types/create-user-data.type';

@Injectable()
export class AuthUserMapper {
  toCreatePersistence(dto: RegisterDto, passwordHash: string): CreateUserData {
    return {
      name: dto.name,
      lastName: dto.lastName,
      dni: dto.dni,
      email: dto.email,
      birthday: dto.birthday ? new Date(dto.birthday) : null,
      passwordHash,
    };
  }

  toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      dni: user.dni,
      email: user.email,
      birthday: user.birthday,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
