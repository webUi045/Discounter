export interface ICard {
  date: string;
  cardNumber: number;
  profit: string;
  cardName: string;
}

export interface ICardsObj {
  [key: string]: ICard;
}

export interface IRequestCardsSuccessful {
  cards: ICardsObj;
}
