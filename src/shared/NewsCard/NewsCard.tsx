import { IShop } from "../../types";
import "./NewsCard.scss";

interface INewsCardProps {
  shop: IShop;
}

const NewsCard = (props: INewsCardProps) => {
  const { shop } = props;
  return (
    <div className="news-card">
      <div className="news-card__wrapper">
        <img className="news-card__img" src={shop.img} alt={shop.store} />
        <h3 className="news-card__title">{shop.title}</h3>
        <span className="news-card__store">{shop.store}</span>
        <p className="news-card__description">{shop.description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
