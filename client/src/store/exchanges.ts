import {makeAutoObservable} from "mobx";
import ExchangesService from "../services/ExchangesService";
import { Exchange} from "../models/response/exchangesService/ExchangesResponse";
import {AxiosResponse} from "axios";

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
      const response: AxiosResponse<Array<Exchange>> = await ExchangesService.getExchanges(filters)
      console.log(response.data);
      this.exchanges = response.data;
      return response
    } catch (error) {
      console.log(error);
    }
  }
}
