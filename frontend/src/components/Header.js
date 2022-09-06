import React from 'react';
import logoPath from '../images/header-logo.svg';
import { Link, Route } from 'react-router-dom';

function Header(props) {

  function handleMenuOpen() {
    props.onMenuOpen();
  }

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип с надписью Место Россия" />
      <Route path="/sign-in">
        <Link to='sign-up' className="header__link">Регистрация</Link>
      </Route>
      <Route path="/sign-up">
        <Link to='sign-in' className="header__link">Войти</Link>
      </Route>
      <Route exact path="/">
        <div className="header__linkBlock">
          <p className="header_email">{props.email}</p>
          <button className="header__link" onClick={props.onSignOut}>Выйти</button>
        </div>
        <button className={props.menuButtonStyle ? "header__burger-menu_opened" : "header__burger-menu"} onClick={handleMenuOpen}></button>

      </Route>

    </header>
  );
}

export default Header;
