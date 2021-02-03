import React, { useEffect } from "react";
import NewsCard from "../../shared/NewsCard";
import { useSelector, useDispatch } from "react-redux";
import {
  requestShops,
  requestAuthorizationCheck,
} from "../../store/reducers/discounterReducer";
import "./MainPage.scss";
import { IShop } from "../../types";

interface IState {
  store: {
    shops: IShop[];
    loading: boolean;
  };
}

const MainPage = () => {
  const dispatch = useDispatch();
  const shops = useSelector((state: IState) => state.store.shops);

  useEffect(() => {
    dispatch(requestShops());
    dispatch(requestAuthorizationCheck());
  }, []);
  return (
    <main className="main">
      <div className="main__wrapper">
        <h2 className="main__title">News</h2>
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
