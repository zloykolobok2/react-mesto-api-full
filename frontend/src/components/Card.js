import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleClick = () => {
    props.onClick(props.card);
  }

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  }

  const handleDeleteCard = () => {
    props.onCardDelete(props.card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteBtnClassName = (`places__remove root__link ${isOwn && 'places__remove_visible'}`);
  //лайкнули ли карточку
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `places__like root__link ${isLiked && 'places__like_active'}`;


  return (
    <li className="places__card">
      <button type="button" className={cardDeleteBtnClassName} onClick={handleDeleteCard}></button>
      <img src={props.card.link} alt={props.card.name} className="places__img" onClick={handleClick}/>
      <div className="places__title-wrap">
        <h2 className="places__title">{props.card.name}</h2>
        <div className="places__like-wrap">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="places__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;