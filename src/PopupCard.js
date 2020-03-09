class PopupCard extends Form {
    constructor(props,cardList,validator) {
        super(props,api,user);
        this._form = props.form;
        this._cardList = cardList;
        this._validator = validator;
    }

    _submit(event) {

        event.preventDefault();
            this._api.post(this._api.resources.cards,{
                name:this._form.elements.place.value,
                link:this._form.elements.link.value,
            }).then(data => this._cardList.addCard(new Card(this._api,this._user).create(
                data,true
            )));
            //очищаем форму
            this._form.reset();
            //проверяем кнопку
            this._validator.checkButton();
        //закрываем попап при событии submit
        this._close();
    }

}

export default PopupCard
import Form from "./Form";
import {api,user} from "./index";
import Card from "./Card";