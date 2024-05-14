import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";



export default class Wallet {
  publicAddress = '';
  balance = 0;

  constructor() {
    makeAutoObservable(this);
}

async getBalance () {
try {
  const response = await .
} 
catch (error) {
  
}
}

async getPublicAdress () {
  try {
  
  } 
  catch (error) {
    
  }


}


}