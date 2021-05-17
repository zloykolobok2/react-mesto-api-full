import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleCardClick = (card) => {
    props.onCardClick(card);
  }

  const onCardLike = (card) => {
    props.onCardLike(card);
  }

  const onCardDelete = (card) => {
    props.onCardDelete(card);
  }

  const handleEditProfile = () => {
    props.onEditProfile(true);
  }

  const onEditAvatar = (e) => {
    e.preventDefault();
    props.onEditAvatar();
  }

  return (
    <>
      <section className="profile root__section">
        <a href="/" className="profile__avatar-upload" target="_self" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="аватар" className="profile__avatar"/>
        </a>
        <div className="profile__info">
          <div className="profile__info-wrap">
            <h1 className="profile__name">
              {currentUser.name}
            </h1>
            <button
              type="button"
              className="profile__btn-change root__link"
              aria-label="редактирование профиля"
              onClick={handleEditProfile}
            >
            </button>
          </div>
          <p className="profile__role">
            {currentUser.about}
          </p>
        </div>
        <button
          type="button"
          className="profile__btn-add-img root__link"
          aria-label="добавление места"
          onClick={props.onAddPlace}
        >
        </button>
      </section>

      <section className="cards root__section root__cards">
        <ul className="places">
          {
            props.cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onClick={handleCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />)
            )
          }
        </ul>
      </section>
    </>
  )
}

export default Main;