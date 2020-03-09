
const ERROR_REQUIRE_TEXT = 'Это обязательное поле';
const ERROR_LENGTH_TEXT = 'Должно быть от 2 до 30 символов';
const ERROR_LINK_TEXT = 'Здесь должна быть ссылка';
const ERROR_LINK_IMG = "Здесь должна быть ссылка на картинку";
const isDev = process.env.NODE_ENV === 'development';
//errors which passed throw validator instance
const errorsText = {
    valueMissing: ERROR_REQUIRE_TEXT,
    tooShort: ERROR_LENGTH_TEXT,
    typeMismatchLink: ERROR_LINK_TEXT,
    patternMismatchImg:ERROR_LINK_IMG,
};



//root element for catch the events
const root = document.querySelector('.root');
//card container
const placeContainer = document.querySelector('div.places-list');
//forms
const newForm = document.forms.new;
const profileForm = document.forms.profile;
const avatarForm = document.forms.avatar;
//const url = (isDev) ? 'http://praktikum.tk/' : "https://praktikum.tk/";
const url = "http://localhost";
const apiOptions = {
    url:url,
    groupId:'cohort6',
    resources:{
        cards:'/cards',
        likes:'/cards/like',
        user:'/users/me',
        avatar: '/users/me/avatar'
    },
    headers:{
        authorization:'0c734d8b-79b8-4df9-add9-95f0c2f01c98',
    },
    methods:{
        get: 'GET',
        post: 'POST',
        patch: 'PATCH',
        put: 'PUT',
        delete: 'DELETE',
    }

};
const optionsCardList = {
    root: root,
    container: placeContainer,
};


const optionsPopupImage = {
    root: root,
    container: document.querySelector('.popup-image'),
    content: document.querySelector('.popup-image__image'),
    closeElem: document.querySelector('.popup-image__close'),
    isOpened: 'popup-image_is-opened',
    openElem: 'place-card__image'
};

const optionsPopupCard = {
    root: root,
    container: document.querySelector('.popup'),
    content: document.querySelector('.popup__content'),
    closeElem: document.querySelector('.popup__close'),
    isOpened: 'popup_is-opened',
    openElem: 'user-info__button',
    form:newForm,
};

const optionsPopupAvatar = {
    root: root,
    container: document.querySelector('.popup-avatar'),
    content: document.querySelector('.popup__content'),
    closeElem: document.querySelector('.popup-avatar__close'),
    isOpened: 'popup_is-opened',
    openElem: 'user-info__photo',
    avatarField:document.querySelector('.user-info__photo'),
    form:avatarForm,
};

const optionsPopupProfile = {
    root: root,
    container: document.querySelector('.popup-edit'),
    content: document.querySelector('.popup__content'),
    closeElem: document.querySelector('.popup-edit__close'),
    isOpened: 'popup_is-opened',
    openElem: 'user-info__edit',
    form: profileForm,
    userInfoNameField: document.querySelector('.user-info__name'),
    userInfoJobField: document.querySelector('.user-info__job'),
    avatar:document.querySelector('.user-info__photo')
};

export {errorsText,root,placeContainer,apiOptions,optionsCardList,optionsPopupImage,optionsPopupCard,optionsPopupAvatar,optionsPopupProfile,newForm,profileForm,avatarForm};