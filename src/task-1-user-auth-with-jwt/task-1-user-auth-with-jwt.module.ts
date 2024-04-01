import { Module } from '@nestjs/common';

import { SessionsModule } from '../sessions/sessions.module';
import { Task1UserAuthWithJwtService } from './task-1-user-auth-with-jwt.service';
import { Task1UserAuthWithJwtController } from './task-1-user-auth-with-jwt.controller';

@Module({
  imports: [SessionsModule],
  providers: [Task1UserAuthWithJwtService],
  controllers: [Task1UserAuthWithJwtController],
})
export class Task1UserAuthWithJwtModule {}
