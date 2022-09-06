import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/currentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main-content">
      <section className="profile">
        <button
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          type="button"
          onClick={props.onEditAvatar}
        ></button>
        <div className="profile__info">
          <div className="profile__top-line">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={props.onEditProfile}
              aria-label="Редактировать"
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
          aria-label="Добавить"
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((cardItem) => (
          <Card
          key={cardItem._id}
          card={cardItem}
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}/>
        ))}
      </section>
    </main>
  );
}

export default Main;
