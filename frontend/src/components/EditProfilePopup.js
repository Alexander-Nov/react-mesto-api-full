import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/currentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      children={
        <>
          <input
            type="text"
            id="input-name"
            className="popup__input popup__input-name"
            name="input-name"
            minLength="2"
            maxLength="40"
            placeholder="Фамилия Имя"
            required
            value={name || ""}
            onChange={handleChangeName}
          />
          <span id="input-name-error" className="popup__span-error"></span>
          <input
            type="text"
            id="input-prof"
            className="popup__input popup__input-prof"
            name="input-prof"
            minLength="2"
            maxLength="200"
            placeholder="Профессия"
            required
            value={description || ""}
            onChange={handleChangeDescription}
          />
          <span id="input-prof-error" className="popup__span-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
