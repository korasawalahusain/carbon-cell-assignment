import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { omit } from 'lodash';
import { nanoid } from '../utils/idgen';
import { JwtService } from '@nestjs/jwt';
import { createDate } from '../utils/date';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

export type TokenType = 'accessToken' | 'refeshToken';

export type TokenPayload = {
  userId: string;
  sessionId: string;
};

@Injectable()
export class SessionsService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  verifyJwtToken(token: string, type: TokenType) {
    return new Promise<TokenPayload>(async (resolve, reject) => {
      try {
        const payload = await this.jwtService.verifyAsync<TokenPayload>(token, {
          secret:
            type === 'accessToken'
              ? this.configService.get<string>('jwt.access_token_secret')
              : this.configService.get<string>('jwt.refresh_token_secret'),
        });

        resolve(payload);
      } catch (error) {
        reject(
          error.name === 'TokenExpiredError'
            ? 'Token Expired'
            : 'Invalid Token',
        );
      }
    });
  }

  generateJwtToken(payload: TokenPayload, type: TokenType) {
    return this.jwtService.sign(payload, {
      issuer: 'api.certiff.com',
      expiresIn: type === 'accessToken' ? '1h' : '90d',
      secret:
        type === 'accessToken'
          ? this.configService.get<string>('jwt.access_token_secret')
          : this.configService.get<string>('jwt.refresh_token_secret'),
    });
  }

  async validateRefreshToken(refreshToken: string, userId: string) {
    const userSession = await this.prismaService.userSession.findUnique({
      where: {
        userId_refreshToken: {
          userId,
          refreshToken,
        },
        revoked: false,
      },
    });

    if (!userSession) {
      await this.revokeAll(userId);

      throw new UnauthorizedException('Invalid Refresh Token');
    }

    return userSession.id;
  }

  async rotateRefreshToken(sessionId: string, userId: string) {
    const updatedSession = await this.prismaService.userSession.update({
      where: {
        userId_id: {
          userId,
          id: sessionId,
        },
        revoked: false,
      },
      data: {
        refreshToken: this.generateJwtToken(
          {
            userId,
            sessionId,
          },
          'refeshToken',
        ),
      },
    });

    return {
      refreshToken: updatedSession.refreshToken,
    };
  }

  async createSession(
    userId: string,
    provider: string,
    code?: string,
    codeExpiration?: Date,
  ) {
    const newSessionId = nanoid();
    const refreshToken = this.generateJwtToken(
      {
        userId,
        sessionId: newSessionId,
      },
      'refeshToken',
    );

    const createdSession = await this.prismaService.userSession.create({
      data: {
        id: newSessionId,
        userId,
        refreshToken,
        provider,
        code,
        codeExpiration,
      },
    });

    return { sessionId: createdSession.id, refreshToken };
  }

  async create(userId: string, code: string) {
    const userFound = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userFound) {
      throw new NotFoundException('invalid_code');
    }

    const sessionFound = await this.prismaService.userSession.findFirst({
      where: {
        code: code,
        revoked: false,
        userId: userFound.id,
      },
    });

    if (!sessionFound) {
      throw new BadRequestException('invalid_code');
    }

    if (sessionFound.codeExpiration < new Date()) {
      await this.prismaService.userSession.update({
        where: {
          revoked: false,
          id: sessionFound.id,
          userId: userFound.id,
        },
        data: {
          code: null,
          revoked: true,
          codeExpiration: null,
          revokedAt: createDate(),
        },
      });
      throw new BadRequestException('code_expired');
    }

    const accessToken = this.generateJwtToken(
      {
        userId: userFound.id,
        sessionId: sessionFound.id,
      },
      'accessToken',
    );

    return {
      accessToken,
      refreshToken: sessionFound.refreshToken,
      expiresIn: 3600,
      loginTime: Date.now(),
      data: omit(userFound, 'password'),
    };
  }

  async getAll(userId: string, limit: number, offset: number) {
    const sessionsFound = await this.prismaService.userSession.findMany({
      where: {
        userId,
        revoked: false,
      },
      take: limit,
      skip: limit * offset,
    });

    return {
      data: sessionsFound,
    };
  }

  async findOne(userId: string, sessionId: string) {
    return await this.prismaService.userSession.findMany({
      where: {
        userId,
        id: sessionId,
        revoked: false,
      },
    });
  }

  async revoke(userId: string, refreshToken: string) {
    return await this.prismaService.userSession.update({
      where: {
        userId_refreshToken: {
          userId,
          refreshToken,
        },
        revoked: false,
      },
      data: {
        revoked: true,
        revokedAt: createDate(),
      },
    });
  }

  async revokeAll(userId: string) {
    return await this.prismaService.userSession.updateMany({
      where: {
        userId,
        revoked: false,
      },
      data: {
        revoked: true,
        revokedAt: createDate(),
      },
    });
  }
}
