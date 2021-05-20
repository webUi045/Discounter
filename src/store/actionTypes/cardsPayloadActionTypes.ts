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

interface IInitialState {
    error: string
  }
  
  export interface IAddCard {
    uid: string;
    cardName: string;
    date: string;
    cardNum: number;
    profit: string;
  }
  