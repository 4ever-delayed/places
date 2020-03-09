class PopupImage extends Popup {
    constructor(props) {
        super(props);

    }
//переопределяем родительский метод открытия для открытия картинки
    _open(e) {
        let target = e.target;
        if (target.classList.contains(this._openElem)) {
            this._container.classList.add(this._isOpened);
            this._content.src = e.target.style.backgroundImage.slice(5, -2);
        }
    }





}
export default PopupImage
import Popup from "./Popup";