import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import api from "../utils/api";
import {LINKS} from "../utils/utils"

import ErrorMessagePopup from "./ErrorMessagePopup";
import SuccessMessagePopup from "./SuccessMessagePopup";

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  // TODO: нужно сделать подтверждение удаление карточки
  //const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

  const [email, setEmail] = React.useState('');

  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push(LINKS.home);
    }
  }, [loggedIn, history])

  React.useEffect(() => {
    api.getProfile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((res) => {
        console.log(res);
      });
    api.getCardList()
      .then((data) => {
        setCards(data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = (isVisible) => {
    setIsEditProfilePopupOpen(isVisible);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleUpdateUser = (name, description) => {
    api.editProfile(name, description).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((res) => {
      console.log(res);
    });
  }

  const handleUpdateAvatar = (avatar) => {
    api.editAvatar(avatar).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((res) => {
      console.log(res);
    })
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsErrorPopupOpen(false);
    setIsSuccessPopupOpen(false)
  }

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id).then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      }).catch((res) => {
        console.log(res);
      });
    } else {
      api.addLike(card._id).then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      }).catch((res) => {
        console.log(res);
      });
    }
  }

  const handleDeleteCard = (card) => {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id === card._id));
    }).catch((res) => {
      console.log(res);
    });
  }

  const handleAddCard = (name, link) => {
    api.addCard(name, link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((res) => {
      console.log(res);
    });
  }

  const handleRegisterSubmit = ({email, password}) => {
    api.register({email, password})
      .then((data) => {
        history.push(LINKS.login);
        setIsSuccessPopupOpen(true);
      })
      .catch((err) => {
        setIsErrorPopupOpen(true);
      });
  }

  const handlerLoginSubmit = ({email, password}) => {
    api.login({email, password})
      .then((data) => {
        setLoggedIn(true);
        setEmail(email);
        localStorage.setItem('jwt', data.token);
        history.push(LINKS.home);
      })
      .catch((err) => {
        setIsErrorPopupOpen(true);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    history.push(LINKS.login);
  }

  const checkToken = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
    //проверить токен
      if(jwt) {
        api.checkToken(jwt)
          .then(data => {
            setEmail(data.data.email);
            setLoggedIn(true);
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
          <Header email = {email} onLogout = {handleLogout}/>
          <main className="container">
            <Switch>

              <ProtectedRoute
                path="/"
                exact = {true}
                loggedIn = {loggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCard}
                cards={cards}
              />

              <Route path="/sign-in">
                <Login
                  onSubmit = {handlerLoginSubmit}
                />
              </Route>

              <Route path="/sign-up">
                <Register
                  onSubmit = {handleRegisterSubmit}
                />
              </Route>

            </Switch>
          </main>

          <Footer/>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddCard}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar = {handleUpdateAvatar}
          />

          <ErrorMessagePopup
            isOpen = {isErrorPopupOpen}
            onClose = {closeAllPopups}
          />

          <SuccessMessagePopup
            isOpen = {isSuccessPopupOpen}
            onClose = {closeAllPopups}
          />


          {/* TODO: как будет время сделать подтверждение удаление карточки*/}
          {/*<PopupWithForm*/}
          {/*  name='delete-card'*/}
          {/*  title='Вы уверены?'*/}
          {/*  isOpen={isDeletePlacePopupOpen}*/}
          {/*  onClose={closeAllPopups}*/}
          {/*  buttonText='Сохранить'*/}
          {/*>*/}
          {/*  <input type="hidden" className="popup__input popup__input_card-id" defaultValue="" name="card-id"/>*/}
          {/*</PopupWithForm>*/}

          <ImagePopup
            name='theme_photo'
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
    </CurrentUserContext.Provider>
  );
}

export default App;
