
interface UserCard {
  card_number: string,
  expiry_date: string
}


export interface UserCardsResponse {
userCards: Array<UserCard>
}