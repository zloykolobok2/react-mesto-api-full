import React from 'react';
import logo from '../images/logo.svg';
import {Link, Switch, Route} from 'react-router-dom';
import {LINKS} from "../utils/utils";

function Header(props) {

  const onLogout = (e) => {
    e.preventDefault();
    props.onLogout();
  }

  return (
    <header className="header root__header">
      <div className="header__container">
        <a href={LINKS.home} className="logo root__link" target="_self">
          <img src={logo} alt="Проект Место" className="logo__img"/>
        </a>
        <div>
          <Switch>
            <Route exact path={LINKS.home}>
              <span className="header__user-email">
                {props.email}
              </span>
              <Link to='' className="root__link" onClick={onLogout}>Выход</Link>
            </Route>
            <Route path={LINKS.login}>
              <Link
                to={LINKS.register}
                className="root__link"
              >
                Регистрация
              </Link>
            </Route>
            <Route path={LINKS.register}>
              <Link
                to={LINKS.login}
                className="root__link"
              >
                Вход
              </Link>
            </Route>
          </Switch>
        </div>
      </div>
    </header>
  );
}

export default Header;
