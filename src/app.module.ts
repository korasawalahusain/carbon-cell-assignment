import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { SessionsModule } from './sessions/sessions.module';
import { Task1UserAuthWithJwtModule } from './task-1-user-auth-with-jwt/task-1-user-auth-with-jwt.module';
import { Task2ApiEndpointsForDataRetrievalModule } from './task-2-api-endpoints-for-data-retrieval/task-2-api-endpoints-for-data-retrieval.module';
import { Task4SecureApiEndpointForAuthenticatedUsersOnlyModule } from './task-4-secure-api-endpoint-for-authenticated-users-only/task-4-secure-api-endpoint-for-authenticated-users-only.module';
import { Task5RetrieveEthereumAccountBalanceWithWeb3JsModule } from './task-5-retrieve-ethereum-account-balance-with-web3.js/task-5-retrieve-ethereum-account-balance-with-web3.js.module';

@Module({
  imports: [
    PrismaModule,
    SessionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    Task1UserAuthWithJwtModule,
    Task2ApiEndpointsForDataRetrievalModule,
    Task4SecureApiEndpointForAuthenticatedUsersOnlyModule,
    Task5RetrieveEthereumAccountBalanceWithWeb3JsModule,
  ],
})
export class AppModule {}
