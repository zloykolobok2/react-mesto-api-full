import React from 'react';
import logo from '../images/logo.svg';
import {Link, Switch, Route} from 'react-router-dom';
// import {LINKS} from "../utils/utils";

function Header(props) {

  const onLogout = (e) => {
    e.preventDefault();
    props.onLogout();
  }

  return (
    <header className="header root__header">
      <div className="header__container">
        <a href="/cards" className="logo root__link" target="_self">
          <img src={logo} alt="Проект Место" className="logo__img"/>
        </a>
        <div>
          <Switch>
            <Route exact path='/cards'>
              <span className="header__user-email">
                {props.email}
              </span>
              <Link to='' className="root__link" onClick={onLogout}>Выход</Link>
            </Route>
            <Route path='/signin'>
              <Link
                to='/signup'
                className="root__link"
              >
                Регистрация
              </Link>
            </Route>
            <Route path='/signup'>
              <Link
                to='/signin'
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
