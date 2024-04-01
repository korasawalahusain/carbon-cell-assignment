import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { hash, verify } from 'argon2';

import { RegisterDto } from './dto/register.dto';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { SessionsService, TokenPayload } from '../sessions/sessions.service';

@Injectable()
export class Task1UserAuthWithJwtService {
  constructor(
    private prismaService: PrismaService,
    private sessionsService: SessionsService,
  ) {}

  async login(email: string, password: string) {
    const userFound = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!userFound) {
      throw new NotFoundException('user_not_found');
    }

    if (!userFound.password) {
      throw new UnauthorizedException('invalid_credentials');
    }

    if (!(await verify(userFound.password, password))) {
      throw new UnauthorizedException('invalid_credentials');
    }

    const { sessionId, refreshToken } =
      await this.sessionsService.createSession(userFound.id, 'local');

    const accessToken = this.sessionsService.generateJwtToken(
      {
        sessionId,
        userId: userFound.id,
      },
      'accessToken',
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600,
      loginTime: Date.now(),
      data: new UserEntity(userFound),
    };
  }

  async register(registerDto: RegisterDto) {
    const userFound = await this.prismaService.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (userFound) {
      throw new ConflictException('email_already_exists');
    }

    const newUser = await this.prismaService.user.create({
      data: {
        id: nanoid(),
        ...registerDto,
        password: await hash(registerDto.password),
        fullname: `${registerDto.firstname} ${registerDto.lastname ?? ''}`,
      },
    });

    const { sessionId, refreshToken } =
      await this.sessionsService.createSession(newUser.id, 'local');

    const accessToken = this.sessionsService.generateJwtToken(
      {
        sessionId,
        userId: newUser.id,
      },
      'accessToken',
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600,
      loginTime: Date.now(),
      data: new UserEntity(userFound),
    };
  }

  async refreshToken(refreshToken: string) {
    let payload: TokenPayload;
    try {
      payload = await this.sessionsService.verifyJwtToken(
        refreshToken,
        'refeshToken',
      );
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    const userFound = await this.prismaService.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    if (!userFound) {
      throw new UnauthorizedException('invalid_token');
    }

    const sessionId = await this.sessionsService.validateRefreshToken(
      refreshToken,
      payload.userId,
    );

    const { refreshToken: rotatedRefreshToken } =
      await this.sessionsService.rotateRefreshToken(sessionId, payload.userId);

    const accessToken = this.sessionsService.generateJwtToken(
      {
        sessionId,
        userId: payload.userId,
      },
      'accessToken',
    );

    return {
      accessToken,
      refreshToken: rotatedRefreshToken,
      expiresIn: 3600,
      loginTime: Date.now(),
      data: new UserEntity(userFound),
    };
  }

  async logoutSession(refreshToken: string) {
    const payload = await this.sessionsService.verifyJwtToken(
      refreshToken,
      'refeshToken',
    );

    const userFound = await this.prismaService.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    if (!userFound) {
      throw new UnauthorizedException('invalid_token');
    }

    await this.sessionsService.revoke(payload.userId, refreshToken);

    return {
      message: 'logout_success',
    };
  }
}
