export interface ICard {
    id: string;
    date: string;
    cardNumber: number;
    profit: string;
    cardName: string;
}

export interface IRequestCardsSuccessful {
    cards: ICard[];
}