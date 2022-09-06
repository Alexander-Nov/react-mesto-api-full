import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ConfirmDeletionPopup from "./ConfirmDeletionPopup.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/currentUserContext";
import AddPlacePopup from "./AddPlacePopup.js";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip.js";
import { register, signin, checkToken } from '../utils/auth';
import HeaderMobileMenu from "./HeaderMobileMenu.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmDeletionPopupOpen, setIsConfirmDeletionPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState("");
  const [isMobileMenuVisible, setIsMobileMenuVisible] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [willBeDeletedCard, setWillBeDeletedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('token') ? true : false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const history = useHistory();

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id); // проверяем, есть ли уже лайк на этой карточке
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleConfirmedDeletion(card) {
    setIsLoading(true);
    api
      .deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => !(c._id === card._id)));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    setWillBeDeletedCard(card);
    setIsConfirmDeletionPopupOpen(true);
  }


  React.useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      checkToken(jwt)
      .then((res) => {
        setUserEmail(res.email);
        setCurrentUser(res);  //обновление данных пользователя в случае обновления страницы при наличии токена
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
    }
  }, [history]);

  React.useEffect(() => {
    if (loggedIn) {
      api.updateToken();

      Promise.all([api.getInitialCards(), api.getUserData()])
      .then(([resCardsList, userData]) => {
        setCards(resCardsList);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletionPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setWillBeDeletedCard({});
    setSelectedCard({});
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleUpdateUser = (newUserData) => {
    setIsLoading(true);
    api
      .setUserInfo(newUserData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api
      .updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (newCard) => {
    setIsLoading(true);
    api
      .postNewCard(newCard)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  const handleSignUpSubmit = ({ email, password, name, about, avatar }) => {
    setIsLoading(true);
    register(password, email, name, about, avatar)
    .then ((res) => {
        setIsRegistered(true);
        setInfoTooltipMessage("Вы успешно зарегистрировались!");
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
        setIsLoading(false);
    })
    .catch((err) => {
      setInfoTooltipMessage(`Ошибка при регистрации: ${err}`);
      setIsInfoTooltipOpen(true);
      setIsLoading(false);
    });
  };

  const handleSignInSubmit = ({ email, password }) => {
    setIsLoading(true);
    signin(password, email)
    .then ((data) => {
      if (data) {
        checkToken(data.token)
        .then((res) => {
          setUserEmail(res.email);
          setLoggedIn(true);
          history.push('/');
          setIsLoading(false);
        })
      }

    })
    .catch((err) => {
      setIsLoading(false);
      setIsRegistered(false);
      setInfoTooltipMessage(`Ошибка входа: ${err}. Проверьте вводимые данные и попробуйте еще раз.`);
      setIsInfoTooltipOpen(true);
    });
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setIsMobileMenuVisible(false);
    localStorage.removeItem('token');
    history.push('/sign-in');
  };

  const handleMobileMenuOpenClose = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <HeaderMobileMenu
        email={userEmail}
        isVisible={isMobileMenuVisible}
        onSignOut={handleSignOut}
        />

        <Header
          email={userEmail}
          onSignOut={handleSignOut}
          onMenuOpen={handleMobileMenuOpenClose}
          menuButtonStyle={isMobileMenuVisible}
        />

        <Switch>
          <Route path="/sign-in">
            <Login
              onEnterUser={handleSignInSubmit}
              isLoading={isLoading}
            />
          </Route>

          <Route path="/sign-up">
            <Register
              onAddUser={handleSignUpSubmit}
              isLoading={isLoading}
            />
          </Route>

          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}>
          </ProtectedRoute>
        </Switch>


        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmDeletionPopup
          isOpen={isConfirmDeletionPopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          card={willBeDeletedCard}
          onDeletionSubmit={handleConfirmedDeletion}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpened={isImagePopupOpen}
        />

        <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isRegistered={isRegistered}
        onClose={closeAllPopups}
        messageText={infoTooltipMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
