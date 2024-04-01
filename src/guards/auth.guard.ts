import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private prismaService: PrismaService,
    private sessionsService: SessionsService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('invalid_token');
    }

    return this.sessionsService
      .verifyJwtToken(token, 'accessToken')
      .then((payload) => {
        return this.prismaService.userSession
          .findUnique({
            where: {
              revoked: false,
              userId_id: {
                id: payload.sessionId,
                userId: payload.userId,
              },
            },
          })
          .then((session) => {
            if (!session) {
              throw new UnauthorizedException('invalid_token');
            }

            request['user'] = {
              userId: payload.userId,
            };

            return true;
          })
          .catch(() => {
            throw new UnauthorizedException('Unauthorized');
          });
      })
      .catch((error) => {
        throw new UnauthorizedException(error);
      });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (!!request.headers['authorization']) {
      const [type, token] = request.headers['authorization'].split(' ');
      return type === 'Bearer' ? token : undefined;
    } else {
      return undefined;
    }
  }
}
