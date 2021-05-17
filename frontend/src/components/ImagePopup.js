function ImagePopup(props) {
  let className = `popup popup_${props.name}`;
  if (props.isOpen) {
    className += ' popup_opened'
  }

  return (
    <div className={className}>
      <div className="popup__container popup__container_theme_photo">
        <button
          type="button"
          className="popup__btn-close popup__btn-close_theme_photo root__link"
          aria-label="закрыть попап"
          onClick={props.onClose}>
        </button>
        <img src={props.card.link} alt={props.card.name} className="popup__photo"/>
        <h2 className="popup__title popup__title_theme_photo">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;