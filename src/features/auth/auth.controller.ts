import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginDto} from "./dto/login.dto";
import {RegisterDto} from "./dto/register.dto";
import {RefreshTokenDto} from "./dto/refresh-token-dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: RegisterDto) {
    return this.authService.register(signUpDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto)
    return this.authService.login(loginDto);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.CREATED)
  async refresh(@Body() refreshDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshDto);
  }
}
