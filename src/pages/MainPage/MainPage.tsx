import React, { useEffect } from "react";
import NewsCard from "../../shared/NewsCard";
import { useSelector, useDispatch } from "react-redux";
import { requestShops, requestAuthorizationCheck, IInitialState, } from "../../store/reducers/discounterReducer";
import loader from "../../assets/images/loader.gif";
import { IShop } from "../../types";
import "./MainPage.scss";

interface IState {
  store: {
    shops: IShop[];
    loading: boolean;
  };
}

const MainPage = () => {
  const dispatch = useDispatch();
  const shops = useSelector((state: IState) => state.store.shops);
  const { loading, isAuth } = useSelector((state: { store: IInitialState }) => state.store);

  useEffect(() => {
    dispatch(requestShops());
    dispatch(requestAuthorizationCheck());

    // eslint-disable-next-line
  }, [isAuth]);


  return (
    <main className="main">
      <div className="main__wrapper">
        {loading ?
          <div className="main__loader-container">
            <img className="loader" src={loader} alt="loader" />
          </div> :
          <>
            <h2 className="main__title">News</h2>
            {shops.map((shop: IShop) => <NewsCard key={shop.id} shop={shop} />)}
          </>
        }
      </div>
    </main>
  );
};

export default MainPage;
