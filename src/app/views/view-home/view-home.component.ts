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

  @Output() deployProxyFactoryContract = new EventEmitter();
  @Output() callSetDeployNewInstance = new EventEmitter();
  @Output() callSendEther = new EventEmitter();
  @Output() callSetSendAddress = new EventEmitter();
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

  onCallSetDeployNewInstance(salt: string): void {
    this.callSetDeployNewInstance.emit(salt);
  }

  onCallSetSendAddressFunction(sendAddress: string): void {
    this.callSetSendAddress.emit(sendAddress);
  }

  onCallSetSendFundsFunction(sendAmount: string): void {
    this.callSendEther.emit(sendAmount);
  }
}
