import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard';
import { Task4SecureApiEndpointForAuthenticatedUsersOnlyService } from './task-4-secure-api-endpoint-for-authenticated-users-only.service';

@ApiTags('Task 4 - Secure API Endpoint for Authenticated Users Only')
@Controller('task-4-secure-api-endpoint-for-authenticated-users-only')
export class Task4SecureApiEndpointForAuthenticatedUsersOnlyController {
  constructor(
    private readonly task4SecureApiEndpointForAuthenticatedUsersOnlyService: Task4SecureApiEndpointForAuthenticatedUsersOnlyService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  returnMessage() {
    return this.task4SecureApiEndpointForAuthenticatedUsersOnlyService.returnMessage();
  }
}
