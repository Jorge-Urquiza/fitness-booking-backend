import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { AUTH_ERRORS, AUTH_SECURITY } from './constants/auth.constants';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthUserMapper } from './mappers/auth-user.mapper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly authUserMapper: AuthUserMapper,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const email = this.authUserMapper.normalizeEmail(dto.email);
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException(AUTH_ERRORS.EMAIL_ALREADY_REGISTERED);
    }

    const passwordHash = await bcrypt.hash(dto.password, this.getSaltRounds());
    const user = this.usersRepository.create(
      this.authUserMapper.toPersistence({ ...dto, email, passwordHash }),
    );
    const savedUser = await this.usersRepository.save(user);

    return this.buildAuthResponse(savedUser);
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const email = this.authUserMapper.normalizeEmail(dto.email);
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    return this.buildAuthResponse(user);
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(AUTH_ERRORS.USER_NOT_FOUND);
    }
    return user;
  }

  toUserResponse(user: User): UserResponseDto {
    return this.authUserMapper.toResponse(user);
  }

  private async buildAuthResponse(user: User): Promise<AuthResponseDto> {
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
      user: this.toUserResponse(user),
    };
  }

  private getSaltRounds(): number {
    const rawSaltRounds = process.env[AUTH_SECURITY.BCRYPT_SALT_ROUNDS_ENV_KEY];
    const parsedRounds = Number(rawSaltRounds);
    if (
      Number.isNaN(parsedRounds) ||
      parsedRounds < AUTH_SECURITY.MIN_BCRYPT_SALT_ROUNDS
    ) {
      return AUTH_SECURITY.DEFAULT_BCRYPT_SALT_ROUNDS;
    }
    return parsedRounds;
  }
}
