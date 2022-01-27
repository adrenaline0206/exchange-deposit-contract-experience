import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { ETEREUM_NETWORK_ID, ETHER_SCAN_BASE_URL, EXCHANGE_DEPOSIT_CONTRACT_ADDRESS } from 'src/common/constants/values';
import { proxyFactoryContract } from '../../../../contracts/json/proxy-factory'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  proxyFactoryAbi = proxyFactoryContract.abi;
  proxyFactoryBytecode = proxyFactoryContract.bytecode;
  isEthereumReady?: boolean;
  isMetaMask?: boolean;
  isConnectedToMetaMask?: boolean;
  accounts?: any[];
  currentAccount?: string;
  currentNetwork?: string;
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.providers.JsonRpcSigner;
  contractFactory?: ethers.ContractFactory;
  contract?: ethers.Contract;
  contractAddress?: string;
  deployNewInstanceAddress?: string;
  deployTransaction?: ethers.providers.TransactionResponse;
  setDeployNewInstanceTransaction?: ethers.providers.TransactionResponse;
  deployNewInstanceTransactionHash?: string;
  greets: string[];
  greetingMessage?: string;
  setSendFoundsTransaction?: ethers.providers.TransactionResponse;
  setGreetingTransaction?: ethers.providers.TransactionResponse;

  constructor() {
    this.greets = [];
    this.appConnectToMetaMask();
  }

  ngOnInit(): void { }

  async appConnectToMetaMask(): Promise<void> {
    const ethereum = (window as any).ethereum
    console.log('ethereum', ethereum);
    this.isEthereumReady = typeof ethereum === undefined;
    if (this.isEthereumReady) {
      console.error('MetaMask is not installed!');
      return;
    }
    this.isMetaMask = ethereum.isMetaMask;
    if (!this.isMetaMask) {
      console.error('It is not MetaMask!');
      return;
    }
    try {
      // https://docs.metamask.io/guide/rpc-api.html#table-of-contents
      this.accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('accounts', this.accounts);
    } catch (error) {
      console.error('Failed to get MetaMask Accounts!');
      console.error(error);
      return;
    }
    if (this.accounts === undefined || this.accounts.length === 0) {
      console.error('MetaMask does not have any accounts!');
      return;
    }
    try {
      this.currentAccount = (window as any).ethereum.selectedAddress;
      console.log('currentAccount', this.currentAccount);
    } catch (error) {
      console.error(error);
      console.error('Failed to select MetaMask 1st Account!');
      return;
    }
    this.currentNetwork = ETEREUM_NETWORK_ID[`${(window as any).ethereum.networkVersion}`] ;
    if (this.currentNetwork !== 'Rinkeby') {
      throw new Error('This netWork does not Rinkeby!')
    }
  }

  // async appDeployGreeterContract(): Promise<void> {
  //   this.provider = new ethers.providers.Web3Provider((window as any).ethereum);
  //   this.signer = this.provider.getSigner();
  //   this.contractFactory = new ethers.ContractFactory(this.abi, this.bytecode, this.signer);
  //   this.contract = await this.contractFactory.deploy("Hello, world!");
  //   console.log('contract', this.contract);
  //   this.contractAddress = this.contract.address;
  //   console.log('contractAddress', this.contractAddress);
  //   this.deployTransaction = this.contract.deployTransaction;
  //   console.log('deployTransaction', this.deployTransaction);
  //   await this.contract.deployTransaction.wait(1);
  //   console.log('deployTransaction is 1 confirmed');
  // }

  async appDeployProxyFactoryContract(): Promise<void> {
    this.provider = new ethers.providers.Web3Provider((window as any ).ethereum);
    this.signer = this.provider.getSigner();
    this.contractFactory = new ethers.ContractFactory(this.proxyFactoryAbi, this.proxyFactoryBytecode, this.signer);
    this.contract = await this.contractFactory.deploy(EXCHANGE_DEPOSIT_CONTRACT_ADDRESS);
    console.log('contract', this.contract);
    this.contractAddress = this.contract.address;
    console.log('contractAddress', this.contractAddress);
    this.deployTransaction = this.contract.deployTransaction;
    console.log('deployTransaction', this.deployTransaction);
    await this.contract.deployTransaction.wait(1);
    console.log(`deployTransaction is 1 confirmed`);
  }

  async appCallSetDeployNewInstance(salt: string): Promise<void> {
    if(this.contract === undefined && this.contractAddress !== undefined && this.provider !== undefined) {
      this.contract = new ethers.Contract(this.contractAddress, this.proxyFactoryAbi, this.provider);
    }
    this.setDeployNewInstanceTransaction = await this.contract?.['deployNewInstance'](salt);
    console.log('setDeployNewInstanceTransaction', this.setDeployNewInstanceTransaction);
    await this.setDeployNewInstanceTransaction?.wait(1);
    console.log('setDeployNewInstanceTransaction is 1 confirmation');
    this.deployNewInstanceTransactionHash = this.setDeployNewInstanceTransaction?.hash;
  }

  async sendEther(sender: string, receiver: string, sendAmount: string): Promise<void> {
    console.log(`payWithMetamask(receiver= ${receiver}, sender=${sender}, sendAmount=${sendAmount}).`);
    this.provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const params = [{
      from: sender,
      to: receiver,
      value: ethers.utils.parseUnits(sendAmount, 'ether').toHexString(),
    }];

    const transactionHash = this.provider.send('eth_sendTransaction', params)
    console.log('transactionHash is ' + transactionHash);
  }

  async appCallSendEther(sendAmount: string): Promise<void> {
    if(this.currentAccount == undefined){
      throw new Error('currentAccount is undefined');
    }else if (this.deployNewInstanceAddress == undefined){
      throw new Error('deployNewInstanceAddress is undefined');
    }
    this.sendEther(this.currentAccount, this.deployNewInstanceAddress, sendAmount);
  }

  // async appCallGreetFunction(): Promise<void> {
  //   if (this.contract === undefined && this.contractAddress !== undefined && this.provider !== undefined) {
  //     this.contract = new ethers.Contract(this.contractAddress, this.abi, this.provider);
  //   }
  //   this.greetingMessage = await this.contract?.['greet']();
  //   console.log('greetingMessage', this.greetingMessage);
  //   if (this.greetingMessage) {
  //     this.greets.push(this.greetingMessage);
  //   }
  // }

  // async appCallSetGreetingFunction(newGreetingMessage: string): Promise<void> {
  //   if (this.contract === undefined && this.contractAddress !== undefined && this.provider !== undefined) {
  //     this.contract = new ethers.Contract(this.contractAddress, this.abi, this.provider);
  //   }
  //   this.setGreetingTransaction = await this.contract?.['setGreeting'](newGreetingMessage);
  //   console.log('setGreetingTransaction', this.setGreetingTransaction);
  //   await this.setGreetingTransaction?.wait(1);
  //   console.log('setGreetingTransaction is 1 confirmed');
  // }

  goToLink(path: string): void {
    window.open(`${ETHER_SCAN_BASE_URL + path}`, '_blank');
  }
}
