import Web3 from 'web3';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class Task5RetrieveEthereumAccountBalanceWithWeb3JsService {
  constructor(@Inject('Web3') private readonly web3: Web3) {}

  async balance(walletId: string) {
    const balance = await this.web3.eth.getBalance(walletId);
    return {
      balance: `${this.web3.utils.fromWei(balance, 'ether')} ether`,
    };
  }
}
