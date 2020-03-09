class PopupAvatar extends Form {
    constructor(props,validator) {
        super(props,api,user);
        this._form = props.form;
        this._avatarField = props.avatarField;
        this._validator = validator;
    }

    _update(data) {
        this._avatarField.style.backgroundImage = `url(${data.avatar})`;
        this._form.avatar.value = data.avatar;

    }

    getAvatar() {
        this._api.get(this._api.resources.user).then(data => {
                this._user.id = data._id;
                this._update(data);
                //console.log(res)
            }

        );
        return this;

    }

    _submit(event){
        event.preventDefault();
        this._api.update(this._api.resources.avatar,{
            avatar:this._form.avatar.value,
        }).then(data => this._update(data)
        );


        //закрываем попап при событии submit
        this._close();
    }
}

export default PopupAvatar
import Form from "./Form";
import {api,user} from "./index"