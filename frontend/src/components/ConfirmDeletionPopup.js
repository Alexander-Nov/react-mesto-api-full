import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletionPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeletionSubmit(props.card)
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.isLoading ? "Удаление..." : "Да"}
      onSubmit={handleSubmit}
      children={<></>}
    />
  );
}

export default ConfirmDeletionPopup;
