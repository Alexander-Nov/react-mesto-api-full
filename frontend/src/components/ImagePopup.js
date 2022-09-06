import React from "react";

function ImagePopup({card, onClose, isOpened}) {
  return (
    <section
      className={`popup popup_type_image popup_dark-background popup_centered ${isOpened ? "popup_is-opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
        ></button>
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
        />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
