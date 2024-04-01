import { Web3 } from 'web3';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Task5RetrieveEthereumAccountBalanceWithWeb3JsService } from './task-5-retrieve-ethereum-account-balance-with-web3.js.service';
import { Task5RetrieveEthereumAccountBalanceWithWeb3JsController } from './task-5-retrieve-ethereum-account-balance-with-web3.js.controller';

@Module({
  providers: [
    Task5RetrieveEthereumAccountBalanceWithWeb3JsService,
    {
      provide: 'Web3',
      useFactory: (configService: ConfigService) => {
        return new Web3(configService.get('ALCHEMY_URL'));
      },
      inject: [ConfigService],
    },
  ],
  controllers: [Task5RetrieveEthereumAccountBalanceWithWeb3JsController],
})
export class Task5RetrieveEthereumAccountBalanceWithWeb3JsModule {}
