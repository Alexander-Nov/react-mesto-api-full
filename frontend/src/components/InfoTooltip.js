import React from "react";
import successImage from '../images/success.png';
import failImage from '../images/fail.png';


function InfoTooltip(props) {
  const popupMessageText = props.messageText;

  return (
    <div className={`popup ${props.isOpen ? " popup_is-opened" : ""}`}>
      <div className="popup__form">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
          aria-label="Закрыть"
        ></button>
        <img
          className="popup__success-image"
          src={props.isRegistered ? successImage : failImage}
          alt={props.isOpen ? "Успешно" : "Ошибка"}
        />
        <h2 className="popup__title popup__title_centered">{popupMessageText}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
