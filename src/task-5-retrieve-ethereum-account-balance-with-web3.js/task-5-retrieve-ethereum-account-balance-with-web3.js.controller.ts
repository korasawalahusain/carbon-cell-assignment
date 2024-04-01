import { Controller, Param } from '@nestjs/common';

import { Task5RetrieveEthereumAccountBalanceWithWeb3JsService } from './task-5-retrieve-ethereum-account-balance-with-web3.js.service';

@Controller('task-5-retrieve-ethereum-account-balance-with-web3.js')
export class Task5RetrieveEthereumAccountBalanceWithWeb3JsController {
  constructor(
    private readonly task5RetrieveEthereumAccountBalanceWithWeb3JsService: Task5RetrieveEthereumAccountBalanceWithWeb3JsService,
  ) {}

  async getBalance(@Param('walletId') walletId: string) {
    return await this.task5RetrieveEthereumAccountBalanceWithWeb3JsService.balance(
      walletId,
    );
  }
}
