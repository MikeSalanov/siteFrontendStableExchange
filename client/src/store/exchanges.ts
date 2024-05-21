import {makeAutoObservable} from "mobx";
import ExchangesService from "../services/ExchangesService";
import { Exchange} from "../models/response/exchangesService/ExchangesResponse";

export default class Exchanges {
  exchanges: Array<Exchange> = []


  constructor() {
    makeAutoObservable(this);
}

async getExchanges () {
  try {
    const response = await ExchangesService.getExchanges
    ()
    console.log(response.data);
    this.exchanges = response.data.exchanges
  } catch (error) {
    console.log(error);
  }
}
}