import React, { useEffect } from "react";
import NewsCard from "../../shared/NewsCard";
import { useSelector, useDispatch } from "react-redux";
import { shopsRequested } from "../../store/reducers/shopsReducer";
import "./MainPage.scss";
import { IShop } from "../../types";

interface IState {
  shops: {
    shops: IShop[];
    loading: boolean;
  };
}
const MainPage = () => {
  const dispatch = useDispatch();
  const shops = useSelector((state: IState) => state.shops.shops);

  useEffect(() => {
    dispatch(shopsRequested());
  }, []);
  return (
    <main className="main">
      <div className="main__wrapper">
        <h2>News</h2>
        <>
          {shops.length ? (
            shops.map((shop: IShop) => <NewsCard key={shop.id} shop={shop} />)
          ) : (
            <p>Loading...</p>
          )}
        </>
      </div>
    </main>
  );
};

export default MainPage;
