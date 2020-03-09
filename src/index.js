'use strict';
import './index.css'
import Api from './Api.js'
import Validation from "./Validation";
import {errorsText, apiOptions, optionsCardList, optionsPopupImage, optionsPopupCard, optionsPopupAvatar, optionsPopupProfile} from './Options.js';
import {newForm,profileForm,avatarForm} from './Options'
export let api = new Api(apiOptions);

//объект для хранения id user'а
import User from "./User";
export let user = new User(api);

//init  profile form
import PopupProfile from "./PopupProfile";
new PopupProfile(optionsPopupProfile, new Validation(profileForm, { errorsText: errorsText }), api,user)
    .getProfile()
    .addEventListeners()
    .addFormEventListeners();


//init and create avatar form
import PopupAvatar from "./PopupAvatar";
new PopupAvatar(optionsPopupAvatar, new Validation(avatarForm, { errorsText: errorsText }), api,user)
    .getAvatar()
    .addEventListeners()
    .addFormEventListeners();

//init card list instance
import Card from "./Card";
let card = new Card(api,user);
import CardList from "./CardList";
let cardList = new CardList(optionsCardList, card);
cardList.addEventListeners().render();

//init and create Popup
import PopupImage from "./PopupImage";
new PopupImage(optionsPopupImage).addEventListeners();

//init new place add form
import PopupCard from "./PopupCard";
new PopupCard(optionsPopupCard, cardList, new Validation(newForm, { errorsText: errorsText }), api,user)
  .addEventListeners()
  .addFormEventListeners();
