import { Body, Controller, Post } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Task1UserAuthWithJwtService } from './task-1-user-auth-with-jwt.service';

@Controller('task-1-user-auth-with-jwt')
export class Task1UserAuthWithJwtController {
  constructor(
    private readonly task1UserAuthWithJwtService: Task1UserAuthWithJwtService,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.task1UserAuthWithJwtService.login(
      loginDto.email,
      loginDto.password,
    );
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.task1UserAuthWithJwtService.register(registerDto);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.task1UserAuthWithJwtService.refreshToken(
      refreshTokenDto.refreshToken,
    );
  }

  @Post('/logout')
  async logoutSession(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.task1UserAuthWithJwtService.logoutSession(
      refreshTokenDto.refreshToken,
    );
  }
}
