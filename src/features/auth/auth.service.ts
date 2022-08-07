import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDto } from '../users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ENV } from '../../core/config';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token-dto';

@Injectable()
export class AuthService {
  JWT_SECRET_KEY: string | Buffer = (ENV.JWT_SECRET_KEY = 'JWT_SECRET_KEY');

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validate(userId: string) {
    return this.userService.findOne(userId);
  }

  async validateUser(login: string, pass: string) {
    const user = await this.userService.findByLogin(login);

    if (user && this.validatePassword(pass, user.password)) {
      return user;
    }

    return null;
  }

  async register(user: RegisterDto): Promise<UserDto> {
    return this.userService.create(<CreateUserDto>user);
  }

  validatePassword(password: string, userPassword: string) {
    return bcrypt.compareSync(password, userPassword);
  }

  async decodeRefToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.JWT_SECRET_KEY,
    });
  }

  async login({ login, password }: LoginDto) {
    const userDb = await this.validateUser(login, password);
    console.log('userDb', userDb);

    if (!userDb) {
      throw new HttpException('user not found', HttpStatus.FORBIDDEN);
    }

    const user = { login: userDb.login, userId: userDb.id };

    return this.getUserWithTokens(user);
  }

  getUserWithTokens(payload: { login: string; userId: string }) {
    return {
      accessToken: this.jwtService.sign(
        { payload },
        { secret: this.JWT_SECRET_KEY, expiresIn: '1h' },
      ),
      refreshToken: this.jwtService.sign(
        { payload },
        { secret: this.JWT_SECRET_KEY, expiresIn: '10h' },
      ),
    };
  }

  async refreshToken({ refreshToken }: RefreshTokenDto) {
    try {
      const tokenVerify = await this.decodeRefToken(refreshToken);

      const { payload } = tokenVerify;

      return this.getUserWithTokens(payload);
    } catch (err) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
  }
}
