import {
  Get,
  Body,
  Post,
  Query,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { RevokeSessionDto } from './dto/revoke-session.dto';

import { User } from '../decorators/user.decorator';

@Controller('auth/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async create(
    @User() user: { userId: string },
    @Body() createSessionDto: CreateSessionDto,
  ) {
    return await this.sessionsService.create(
      user.userId,
      createSessionDto.code,
    );
  }

  @Get()
  async getAll(
    @User() user: { userId: string },
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(1), ParseIntPipe) offset: number,
  ) {
    return await this.sessionsService.getAll(user.userId, limit, offset);
  }

  @Get(':id')
  async findOne(
    @Param('id') sessionId: string,
    @User() user: { userId: string },
  ) {
    return await this.sessionsService.findOne(user.userId, sessionId);
  }

  @Delete(':id')
  async revoke(
    @User() user: { userId: string },
    @Body() revokeSessionDto: RevokeSessionDto,
  ) {
    return await this.sessionsService.revoke(
      user.userId,
      revokeSessionDto.refreshToken,
    );
  }

  @Delete()
  async revokeAll(@User() user: { userId: string }) {
    return await this.sessionsService.revokeAll(user.userId);
  }
}
