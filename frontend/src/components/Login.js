import React from 'react';

function Login({ onEnterUser, isLoading }) {

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
    onEnterUser({
      email,
      password,
    });
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit} name="loginForm">
        <fieldset className="login__fieldset">
          <input type="email" onChange={handleEmail} value={email} className="login__input login__inputName" placeholder="Email"/>
          <input type="password" onChange={handlePass} value={password} className="login__input login__inputPass" placeholder="Пароль"/>
          <button type="submit" className="login__submitButton">{isLoading ? "Отправляем запрос..." : "Войти"}</button>
        </fieldset>
      </form>


    </div>
  );
};

export default Login;
