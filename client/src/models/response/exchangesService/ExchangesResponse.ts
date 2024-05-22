
export interface Exchange {
  publicId: string,
  status: string,
  date: string,
  currency_from: string,
  currency_to: string,
  amount_from: number,
  amount_to: number,
}


export interface ExchangesResponse {
exchanges: Array<Exchange>
}