
export interface Exchange {
  publicId: string,
  status: string,
  date: string,
  currencyFrom: string,
  currencyTo: string,
}


export interface ExchangesResponse {
exchanges: Array<Exchange>
}