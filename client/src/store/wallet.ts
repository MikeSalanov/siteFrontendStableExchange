import {makeAutoObservable} from "mobx";
import WalletService from "../services/WalletService";

export default class Wallet {
  publicAddress = '';
  balance = 0;

  constructor() {
    makeAutoObservable(this);
}

async getBalance () {
try {
  const response = await WalletService.getInfo()
  console.log(response.data.balance);
  this.balance = response.data.balance
} 
catch (error) {
  console.log(error);
}
}

async getPublicAdress () {
  try {
    const response = await WalletService.getInfo()
    console.log(response.data.balance);
    this.publicAddress = response.data.publicAddress
  } 
  catch (error) {
    console.log(error);
  }

}


}