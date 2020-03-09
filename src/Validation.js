class Validation {
  constructor(form, props) {
    this.form = form;
    this._errorsText = props.errorsText;
    this._button = this.form.querySelector('.button');
    this._buttonClass = this._button.className.split(' ')[1];
    this._errorHtmlFields = this.form.querySelectorAll('.error-message');
    this.buttonClassDisabled = `${this._buttonClass}_disabled`;
    this._inputs = Array.from(this.form.elements);
  }

  _validate() {
    return this._inputs.every((elem) => elem.checkValidity());
  }

  _enableButton() {
    this._button.removeAttribute('disabled', true);
    this._button.classList.remove(this.buttonClassDisabled);
    this._button.classList.add(this._buttonClass);
  }

  _disableButton() {
    this._button.setAttribute('disabled', true);
    this._button.classList.add(this.buttonClassDisabled);
    this._button.classList.remove(this._buttonClass);
  }


  _removeHtmlErrors() {
    this._errorHtmlFields.forEach((field) => field.textContent = '');
  }

  checkButton() {
    if (this._validate()) {
      this._enableButton();
      this._removeHtmlErrors();
    } else {
      this._disableButton();
    }
  }

  _checkValidity(target, validityState, error) {
    this._inputs.forEach((input) => {
      if (target.name === input.name) {
        if (validityState) {
          this.form.querySelector(`#${input.name}`)
            .textContent = error;
        }

        if (target.validity.valid) {
          this.form.querySelector(`#${input.name}`)
            .textContent = '';
        }
      }
    });
  }

  addHtmlErrors(e) {
    const { target } = e;
    this._checkValidity(target, target.validity.valueMissing, this._errorsText.valueMissing);
    this._checkValidity(target, target.validity.tooShort, this._errorsText.tooShort);
    this._checkValidity(target, target.validity.typeMismatch, this._errorsText.typeMismatchLink);
    this._checkValidity(target, target.validity.patternMismatch, this._errorsText.patternMismatchImg);
  }
}

export default Validation;
