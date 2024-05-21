import {makeAutoObservable} from "mobx";
import ExchangesService from "../services/ExchangesService";
import { Exchange} from "../models/response/exchangesService/ExchangesResponse";

export default class Exchanges {
  exchanges: Array<Exchange> = []


  constructor() {
    makeAutoObservable(this);
}

async getExchanges (filters: { 
  dateFrom?: string, 
  dateTo?: string, 
  status?: string, 
  publicId?: string, 
  currencyFrom?: string, 
  currencyTo?: string 
}) {
  try {
    const response = await ExchangesService.getExchanges(filters)
    console.log(response.data);
    this.exchanges = response.data.exchanges
  } catch (error) {
    console.log(error);
  }
}
}