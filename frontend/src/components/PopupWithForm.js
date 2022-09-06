import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? " popup_is-opened" : ""
      }`}
    >
      <form
        className={`popup__form popup__form_type_${props.name}`}
        name={props.name}
        onSubmit={props.onSubmit}
        novalidate
      >
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
          aria-label="Закрыть"
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <fieldset className="popup__fieldset">
          {props.children}
          <button type="submit" className="popup__submit-button">
            {props.buttonText}
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default PopupWithForm;
