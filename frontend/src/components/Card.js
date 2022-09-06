import React from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id; //я ли владелец карточки
  // console.log(card.owner);
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "" : "element__delete_hidden"
  }`; // Создаём переменную, которую после зададим в `className` для кнопки удаления

  const isLiked = card.likes.some((i) => i === currentUser._id); //ставил ли я лайк
  const cardLikeButtonClassName = `element__heart ${isLiked ? 'element__heart_active' : ""}`;  // Создаём переменную, которую после зададим в `className` для кнопки лайка

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        type="button"
        onClick={handleClick}
      />
      <div className="element__title-block">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
            aria-label="Нравится"
          ></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
        aria-label="Удалить"
      ></button>
    </div>
  );
}

export default Card;
