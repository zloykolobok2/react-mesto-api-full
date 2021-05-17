function PopupWithForm(props) {
  let className = `popup popup_${props.name}`;
  if (props.isOpen) {
    className += ' popup_opened'
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <div className={className}>
      <div className="popup__container popup__container_theme_form">
        <button type="button" className="popup__btn-close root__link" aria-label="закрыть попап"
                onClick={props.onClose}></button>
        <div className="popup__content">
          <h2 className="popup__title">{props.title}</h2>
          <form action="#" className="popup__form" name={props.name} noValidate onSubmit={onSubmit}>
            {props.children}
            <button type="submit" className="popup__btn-save root__link">{props.buttonText}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;