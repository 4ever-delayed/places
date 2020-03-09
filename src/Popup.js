class Popup {
    //базовый класс попап
    //содержит методы открытия и закрытия, общие для всех попапов, а так же метод добавления
    //этих событий
    constructor(props) {
        // this.container = document.querySelector('.popup')
        this._root = props.root;
        this._container = props.container;
        this._content = props.content;
        this._closeElem = props.closeElem;
        this._isOpened = props.isOpened;
        this._openElem = props.openElem;
    }

    _open(e) {
        let target = e.target;
        if (target.classList.contains(this._openElem)) {
            this._container.classList.add(this._isOpened);
        }
    }


    _close() {

            this._container.classList.remove(this._isOpened);

    }


    addEventListeners(){
        this._root.addEventListener('click',this._open.bind(this));
        this._closeElem.addEventListener('click',this._close.bind(this));
        return this;
    }


}

export default Popup