import Popup from './Popup';

class Form extends Popup {
  // базовый класс формы - расширяет Попап,
  // все формы наследуются от этого класса
  // содержит метод добавления обработчиков событий, общих для всех форм

  constructor(props, api, user) {
    super(props);
    this._api = api;
    this._user = user;
  }


  addFormEventListeners() {
    this._form.addEventListener('submit', this._submit.bind(this));
    this._form.addEventListener('input', this._validator.checkButton.bind(this._validator));
    this._form.addEventListener('input', this._validator.addHtmlErrors.bind(this._validator));

    return this;
  }
}

export default Form;
