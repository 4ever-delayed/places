class PopupProfile extends Form {
    constructor(props,validator) {
        super(props,api,user);
        this._form = props.form;
        this._userInfoNameField = props.userInfoNameField;
        this._userInfoJobField = props.userInfoJobField;
        this._validator = validator;
    }

    _update(data) {
        this._userInfoNameField.textContent = data.name;
        this._userInfoJobField.textContent = data.about;

    }


    getProfile() {
        this._api.get(this._api.resources.user).then(data => {
            this._user.id = data._id;
            this._update(data);
            this._form.name.value = data.name;
            this._form.about.value = data.about;
            console.log(data)
            }

        );
        return this;

    }




    _submit(event) {
        event.preventDefault();
        let name = this._form.name.value;
        let about = this._form.about.value;
        this._update({
            name:name,
            about:about,
        });
        this._api.update(this._api.resources.user,{
                                    name:name,
                                    about:about
                                }).then(data => this._update(data));
        //закрываем попап при событии submit
        this._close();
    }



}

export default PopupProfile
import Form from "./Form";
import {api,user} from "./index"