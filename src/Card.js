class Card {
  constructor(api, user) {
    this.user = user;
    this.api = api;
  }


  create(data, isNewCard = false) {
    // console.log(this.user.id);
    const likeIconLiked = (this._isLiked(data.likes)) ? 'place-card__like-icon_liked' : '';
    const showDelIcon = (data.owner._id === this.user.id || isNewCard) ? 'block' : 'none';

    return `
		<div class="place-card" id="${data._id}">
			<div class="place-card__image" style="background-image: url(${data.link});">
				<button class="place-card__delete-icon" style="display: ${showDelIcon}"></button>
			</div>
			<div class="place-card__description">
				<h3 class="place-card__name">${data.name}</h3>
                <div class="place-card__like">
                  <button class="place-card__like-icon ${likeIconLiked}"></button>
                    <div class="place-card__like-counter">${data.likes.length}</div>
                </div>

			</div>
		</div>
		`.trim();
  }


  // если в массиве среди лайков есть наш, то в шаблоне разметки проставляем класс
  _isLiked(data) {
    return data.some((data) => data._id === this.user.id);
  }

  _unlike(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      this.api.delete(this.api.resources.likes, event.target.closest('div.place-card').id)
        .then((data) => {
          event.target.closest('div.place-card')
            .querySelector('.place-card__like-counter').textContent = data.likes.length;
          event.target.classList.remove('place-card__like-icon_liked');
        });
    }
  }

  _like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      this.api.put(this.api.resources.likes, event.target.closest('div.place-card').id)
        .then((data) => {
          event.target.closest('div.place-card')
            .querySelector('.place-card__like-counter').textContent = data.likes.length;
          event.target.classList.add('place-card__like-icon_liked');
        });
    }
  }

  toggleLike(event) {
    // если содержит класс активного лайка, вызываем действие дизлайк
    // иначе лайкаем
    (event.target.classList.contains('place-card__like-icon_liked'))
      ? this._unlike(event) : this._like(event);
    // запрещаем всплытие
    event.stopPropagation();
  }

  remove(event) {
    if (event.target.classList.contains('place-card__delete-icon')) {
      if (confirm('Вы действительно хотите удалить эту карточку?')) {
        this._api.delete(this._api.resources.cards, event.target.closest('div.place-card').id);
        this._container.removeChild(event.target.closest('div.place-card'));
        event.stopPropagation();
      }
    }
  }
}

export default Card;
