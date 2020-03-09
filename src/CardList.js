class CardList {
  constructor(props, card) {
    this._container = props.container;
    this._root = props.root;
    // экземпляр Card для добавления событий карточек
    this._card = card;
    this._api = card.api;
  }

  addCard(card) {
    this._container.insertAdjacentHTML('afterbegin', card);
  }

  render() {
    this._api.get(this._api.resources.cards)
      .then((res) => res.sort((a, b) => a.likes.length - b.likes.length)
        .forEach((data) => {
          this.addCard(this._card.create(data));
        }));
  }

  addEventListeners() {
    this._root.addEventListener('click', this._card.toggleLike.bind(this._card));
    this._root.addEventListener('click', this._card.remove.bind(this));
    return this;
  }
}

export default CardList;
