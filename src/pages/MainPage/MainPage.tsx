import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NewsCard from "../../shared/NewsCard";
import { requestShops } from "../../store/reducers/shopsReducer";
import { requestAuthorizationCheck } from "../../store/reducers/profileReducer";
import loader from "../../assets/images/loader.gif";
import { IShop } from "../../store/actionTypes/shopsPayloadActionTypes";
import "./MainPage.scss";
import { RootState } from "../../store/reducers/rootReducer";

const MainPage = () => {
  const dispatch = useDispatch();
  const { shops } = useSelector((state: RootState) => state.shopReducer);
  const { loading, isAuth } = useSelector((state: RootState) => state.profileReducer);

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