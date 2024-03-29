export interface IShop{
  title: string;
  id: number;
  img: string;
  description: string;
  store: string;
}

export interface IRequestShopsSuccessful {
  shops: IShop[];
}