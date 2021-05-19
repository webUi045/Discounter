import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { RootState } from "../../store/reducers/rootReducer";
import Card from "../../shared/Card";
import { requestCards } from "../../store/reducers/cardsReducer";
import "./MyCards.scss";
import loader from "../../assets/images/loader.gif";

const MyCards = () => {
  const { cards } = useSelector((state: RootState) => state.cardsReducer);
  const { isAuth, loading } = useSelector(
    (state: RootState) => state.profileReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestCards());
  }, []);

  if (!isAuth && !loading) {
    return <Redirect exact to="/"></Redirect>;
  } else {
    const arr = [];
    for (let key in cards) {
      const { date, cardName, cardNumber, profit } = cards[key];
      arr.push(
        <Card
          key={key}
          name={cardName}
          date={date}
          cardNum={cardNumber}
          profit={profit}
        />
      );
    }

    return (
      <div className="cardsList">
        {loading ? (
          <img className="cardsList__loader" src={loader} alt="loader" />
        ) : arr.length !== 0 ? (
          arr
        ) : (
          <p className="cardsList__emptyCard">Please add your card</p>
        )}
      </div>
    );
  }
};

export default MyCards;
