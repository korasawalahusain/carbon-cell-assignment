import { Module } from '@nestjs/common';

import { SessionsModule } from '../sessions/sessions.module';
import { Task4SecureApiEndpointForAuthenticatedUsersOnlyService } from './task-4-secure-api-endpoint-for-authenticated-users-only.service';
import { Task4SecureApiEndpointForAuthenticatedUsersOnlyController } from './task-4-secure-api-endpoint-for-authenticated-users-only.controller';

@Module({
  imports: [SessionsModule],
  providers: [Task4SecureApiEndpointForAuthenticatedUsersOnlyService],
  controllers: [Task4SecureApiEndpointForAuthenticatedUsersOnlyController],
})
export class Task4SecureApiEndpointForAuthenticatedUsersOnlyModule {}
