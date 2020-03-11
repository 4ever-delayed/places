
import './index.css';
import Api from './Api';
import Validation from './Validation';
import {
  // eslint-disable-next-line max-len
  errorsText, apiOptions, optionsCardList, optionsPopupImage, optionsPopupCard, optionsPopupAvatar, optionsPopupProfile,
  newForm, profileForm, avatarForm,
} from './Options';


// объект для хранения id user'а
import User from './User';

// init  profile form
import PopupProfile from './PopupProfile';


// init and create avatar form
import PopupAvatar from './PopupAvatar';

// init card list instance
import Card from './Card';
import CardList from './CardList';

// init and create Popup
import PopupImage from './PopupImage';

// init new place add form
import PopupCard from './PopupCard';

export const api = new Api(apiOptions);

export const user = new User(api);
new PopupProfile(optionsPopupProfile, new Validation(profileForm, { errorsText }), api, user)
  .getProfile()
  .addEventListeners()
  .addFormEventListeners();

new PopupAvatar(optionsPopupAvatar, new Validation(avatarForm, { errorsText }), api, user)
  .getAvatar()
  .addEventListeners()
  .addFormEventListeners();

const card = new Card(api, user);
const cardList = new CardList(optionsCardList, card);
cardList.addEventListeners().render();
new PopupImage(optionsPopupImage).addEventListeners();

new PopupCard(optionsPopupCard, cardList, new Validation(newForm, { errorsText }), api, user)
  .addEventListeners()
  .addFormEventListeners();
