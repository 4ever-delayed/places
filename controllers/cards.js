// eslint-disable-next-line import/no-extraneous-dependencies
const { ObjectId: { isValid } } = require('mongodb');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find(req.params)
    .populate('owner')
    .then((data) => res.send(JSON.stringify(data.send)))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// eslint-disable-next-line no-unused-vars
const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  const userId = req.user._id;

  if (isValid(userId)) {
    Card.create({
      name, link, owner: userId, likes,
    })
      .then((card) => res.status(201).send({ data: card }))
      .catch((err) => res.status(400).send({ message: err.message }));
  }
};
const deleteCard = (req, res) => {
  if (isValid(req.params.id)) {
    Card.findByIdAndDelete(req.params.id)
      .orFail(() => new Error('нет карточки с таким id'))
      .then((card) => {
        res.send({ data: card });
      })
      .catch((err) => res.status(404).send({ message: err.message }));
  } else {
    res.status(400).send({ message: 'id карточки не соответсвует стандарту' });
  }
};

const like = (req, res) => {
  const cardId = req.params.id;
  // eslint-disable-next-line no-underscore-dangle
  const userId = req.user._id;

  if (isValid(cardId)) {
    Card.findByIdAndUpdate(
      cardId,
      {
        $addToSet: { likes: userId },
      },
      { new: true },
    )
      .then((card) => res.send({ data: card }))
      .catch((err) => res.status(404).send({ message: err.message }));
  }
};

const unlike = (req, res) => {

  const cardId = req.params.id;
  // eslint-disable-next-line no-underscore-dangle
  const userId = req.user._id;

  if (isValid(cardId)) {
    Card.findByIdAndUpdate(
      cardId,
      {
        $pull: { likes: userId },
      },
      { new: true },
    )
      .then((card) => {
        res.send({ data: card });
      })
      .catch((err) => res.status(404).send({ message: err.message }));
  }
};
module.exports = {
  unlike, like, deleteCard, createCard, getCards,
};
