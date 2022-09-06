import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onAddUser, isLoading }) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePass(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddUser({
      email,
      password
    });
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit} name="registerForm">
        <fieldset className="register__fieldset">
          <input type="email" onChange={handleEmail} value={email} className="register__input register__inputName" placeholder="Email"/>
          <input type="password" onChange={handlePass} value={password} className="register__input register__inputPass" placeholder="Пароль"/>
          <button type="submit" className="register__submitButton">{isLoading ? "Отправляем запрос..." : "Зарегистрироваться"}</button>
          <div className="register__sign-in-alternative">
            <p className="register__sign-in-text">
              Уже зарегистрированы?&nbsp;
              <Link to='sign-in' className="register__sign-in-link">Войти</Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
