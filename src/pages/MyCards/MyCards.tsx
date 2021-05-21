/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { RootState } from "../../store/reducers/rootReducer";
import Card from "../../shared/Card";
import { requestCards } from "../../store/reducers/cardsReducer";
import "./MyCards.scss";
import loader from "../../assets/images/loader.gif";
import CardForm from "../../shared/CardForm";

const MyCards = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
          cardNumber={cardNumber}
          profit={profit}
        />
      );
    }

    return (
      <div className="cardsListWrapper">
        <div className="cardsListWrapper__addCard">
          <div
            className="cardsListWrapper__addCardAction"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="cardsListWrapper__newCard">Add new card</span>
            <div>
              {isOpen ? (
                <span className="cardsListWrapper__arrow">&#9650;</span>
              ) : (
                <span className="cardsListWrapper__arrow">&#9660;</span>
              )}
            </div>
          </div>
          {isOpen && <CardForm />}
          {loading ? (
            <img
              className="cardsListWrapper__loader"
              src={loader}
              alt="loader"
            />
          ) : arr.length !== 0 ? (
            arr.reverse()
          ) : (
            <p className="cardsListWrapper__emptyCard">Please add your card</p>
          )}
        </div>
      </div>
    );
  }
};

export default MyCards;
