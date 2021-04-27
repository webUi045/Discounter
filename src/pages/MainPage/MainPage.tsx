import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NewsCard from "../../shared/NewsCard";
import { requestShops } from "../../store/shops/reducer/reducer";
import { requestAuthorizationCheck } from "../../store/profile/reducer/reducer";
import loader from "../../assets/images/loader.gif";
import { IShop } from "../../store/shops/payloadActionTypes";
import "./MainPage.scss";
import { RootState } from "../../store/store";

const MainPage = () => {
  const dispatch = useDispatch();
  const shops = useSelector((state: RootState) => state.shops.shops);
  const { loading, isAuth } = useSelector((state: RootState) => state.profile);

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
            {
              shops.length !== 0 && shops.map((shop: IShop) => <NewsCard key={shop.id} shop={shop} />)
            }
          </>
        }
      </div>
    </main>
  );
};

export default MainPage;