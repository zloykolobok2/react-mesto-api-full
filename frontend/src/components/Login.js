import React from 'react';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({email, password});
  }

  return (
    <form className="auth" onSubmit={onSubmit}>
      <div className="auth__input-wrap">
        <h2 className="auth__title">Войти</h2>
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
        <button type="submit" className="auth__send">Войти</button>
      </div>
    </form>
  );
}

export default Login;