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
  @Input() contract?: ethers.Contract;
  @Input() deployTransaction?: ethers.providers.TransactionResponse;
  @Input() greets?: string[];

  @Output() connectToMetaMask = new EventEmitter();
  @Output() deployGreeterContract = new EventEmitter();
  @Output() deploySendFundsContract = new EventEmitter();
  @Output() callGreetFunction = new EventEmitter();
  @Output() callSetGreetingFunction = new EventEmitter();
  @Output() callSetSendFundsFunction = new EventEmitter();
  @Output() goToLink = new EventEmitter();

  constructor() {

   }

  ngOnInit(): void { }

  onGoToLink(etherScanUrl: string): void {
    this.goToLink.emit(etherScanUrl);
  }

  onDeployGreeterContract(): void {
    this.deployGreeterContract.emit();
  }

  onDeploySendFundsContract(): void {
    this.deploySendFundsContract.emit();
  }

  onCallGreetFunction(): void{
    this.callGreetFunction.emit();
  }

  onCallSetGreetingFunction(newGreetingMessage: string): void {
    this.callSetGreetingFunction.emit(newGreetingMessage);
  }

  onCallSetSendFundsFunction(sendAmount: string): void {
    this.callSetSendFundsFunction.emit(sendAmount);
  }
}
