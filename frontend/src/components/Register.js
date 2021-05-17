import React from 'react';
import {Link} from "react-router-dom";
import {LINKS} from "../utils/utils";

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({email, password});
  }


  return (
    <form className="auth" onSubmit={handleSubmit}>
      <div className="auth__input-wrap">
        <h2 className="auth__title">Регистрация</h2>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="auth__input"
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="auth__input"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <div className="auth__controls">
        <button
          type="submit"
          className="auth__send"
        >
          Зарегистрироваться
        </button>
        <span className="auth__text">Уже зарегистрированы? <Link className="auth__link" to={LINKS.login}>Войти</Link></span>
      </div>
    </form>
  );
}

export default Register;