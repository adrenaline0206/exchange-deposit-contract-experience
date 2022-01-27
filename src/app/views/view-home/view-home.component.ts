import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ethers } from 'ethers';

@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.css']
})
export class ViewHomeComponent implements OnInit {
  @Input() currentAccount?: string;
  @Input() currentNetwork?: string;
  @Input() deployNewInstanceTransactionHash?:string;
  @Input() contract?: ethers.Contract;
  @Input() deployTransaction?: ethers.providers.TransactionResponse;
  @Input() setDeployNewInstanceTransaction?: ethers.providers.TransactionResponse;
  @Input() greets?: string[];

  @Output() connectToMetaMask = new EventEmitter();
  @Output() deployProxyFactoryContract = new EventEmitter();
  @Output() callGreetFunction = new EventEmitter();
  @Output() callSetGreetingFunction = new EventEmitter();
  @Output() callSetDeployNewInstance = new EventEmitter();
  @Output() callSendEther = new EventEmitter();
  @Output() goToLink = new EventEmitter();

  constructor() {

   }

  ngOnInit(): void { }

  onGoToLink(etherScanUrl: string): void {
    this.goToLink.emit(etherScanUrl);
  }

  onDeployProxyFactoryContract(): void {
    this.deployProxyFactoryContract.emit();
  }

  onCallGreetFunction(): void{
    this.callGreetFunction.emit();
  }

  onCallSetGreetingFunction(newGreetingMessage: string): void {
    this.callSetGreetingFunction.emit(newGreetingMessage);
  }

  onCallSetDeployNewInstance(salt: string): void {
    this.callSetDeployNewInstance.emit(salt);
  }

  onCallSetSendFundsFunction(sendAmount: string): void {
    this.callSendEther.emit(sendAmount);
  }
}
