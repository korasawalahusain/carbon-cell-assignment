import { Injectable } from '@nestjs/common';

@Injectable()
export class Task4SecureApiEndpointForAuthenticatedUsersOnlyService {
  returnMessage() {
    return 'Hello Folkx, This is a Secure API endpoint';
  }
}
