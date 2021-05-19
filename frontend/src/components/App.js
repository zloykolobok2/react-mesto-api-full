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
  const [changeCard, setChangeCards] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/cards');
    }
  }, [loggedIn, history])

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken();
      api.getProfile(jwt)
        .then((data) => {
          setCurrentUser(data);
          setEmail(data.user.email);
        })
        .catch((res) => {
          console.log(res);
        });

      // if (changeCard) {
        api.getCardList(jwt)
          .then((data) => {
            setCards(data);
          })
          .catch((res) => {
            console.log(res);
          });
        setChangeCards(false);
      // }
    }

  },[loggedIn, changeCard]);


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
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.editProfile(name, description, jwt).then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      }).catch((res) => {
        console.log(res);
      });
    }
  }

  const handleUpdateAvatar = (avatar) => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.editAvatar(avatar, jwt).then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      }).catch((res) => {
        console.log(res);
      })
    }
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
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      if (isLiked) {
        api.deleteLike(card._id, jwt).then((newCard) => {
          setChangeCards(true);
          // setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        }).catch((res) => {
          console.log(res);
        });
      } else {
        api.addLike(card._id, jwt).then((newCard) => {
          // setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
          setChangeCards(true);
        }).catch((res) => {
          console.log(res);
        });
      }
    }
  }

  const handleDeleteCard = (card) => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.deleteCard(card._id, jwt).then(() => {
        // setCards((cards) => cards.filter((c) => c._id === card._id));
        setChangeCards(true);
      }).catch((res) => {
        console.log(res);
      });
    }
  }

  const handleAddCard = (name, link) => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.addCard(name, link, jwt).then((newCard) => {
        // setCards([...cards.cardList, newCard.card]);
        setChangeCards(true);
        closeAllPopups();
      }).catch((res) => {
        console.log(res);
      });
    }
  }

  const handleRegisterSubmit = ({email, password}) => {
    api.register({email, password})
      .then((data) => {
        history.push('/signin');
        setIsSuccessPopupOpen(true);
      })
      .catch((err) => {
        setIsErrorPopupOpen(true);
      });
  }

  const handlerLoginSubmit = ({email, password}) => {
    api.login({email, password})
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setCurrentUser(data);
          history.push('/cards');
        } else {
          localStorage.removeItem('jwt');
        }
      })
      .catch((err) => {
        setIsErrorPopupOpen(true);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    history.push('/signin');
  }

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.checkToken(jwt)
        .then(data => {
          setEmail(data.user.email);
          setCurrentUser(data);
          setLoggedIn(true);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
          <Header email = {email} onLogout = {handleLogout}/>
          <main className="container">
            <Switch>

              <ProtectedRoute
                path="/cards"
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

              <Route path="/signin">
                <Login
                  onSubmit = {handlerLoginSubmit}
                />
              </Route>

              <Route path="/signup">
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
