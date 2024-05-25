
export interface Exchange {
  id: string,
  public_id: string,
  user_id: string,
  status: string,
  currency_from: string,
  currency_to: string,
  amount_from: string,
  amount_to: string,
  transaction_usdt_hash: string,
  card_number_from: string,
  card_number_to: string | null,
  createdAt: string,
  updatedAt: string
}
