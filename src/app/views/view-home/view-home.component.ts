import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ethers } from 'ethers';
import { urlConfig } from 'src/common/constants/types';

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
  @Output() callGreetFunction = new EventEmitter();
  @Output() callSetGreetingFunction = new EventEmitter();
  @Output() goToLink = new EventEmitter();

  constructor() {

   }

  ngOnInit(): void { }

  onGoToLink(urlConf: urlConfig): void {
    this.goToLink.emit(urlConf);
  }

  onDeployGreeterContract(): void {
    this.deployGreeterContract.emit();
  }

  onCallGreetFunction(): void{
    this.callGreetFunction.emit();
  }

  onCallSetGreetingFunction(newGreetingMessage: string): void {
    this.callSetGreetingFunction.emit(newGreetingMessage);
  }
}
