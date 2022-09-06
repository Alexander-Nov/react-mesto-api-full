import React from "react";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {

  const inputAvatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputAvatarRef.current.value
    });
  }

  useEffect(() => {
    inputAvatarRef.current.value = '';
  }, [props.isOpen])


  return (
    <PopupWithForm
          title="Обновить аватар"
          name="avatar"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
          children={
            <>
              <input
                type="url"
                id="avatar-link"
                className="popup__input popup__input-avatar"
                name="avatar-input-link"
                required
                placeholder="Ссылка на новый аватар"
                ref={inputAvatarRef}
              />
              <span id="avatar-link-error" className="popup__span-error"></span>
            </>
          }
        />
  )
}

export default EditAvatarPopup;
