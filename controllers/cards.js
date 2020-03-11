const objectId = require("mongodb").ObjectID;
const Card = require("../models/card");

module.exports.get = (req, res) => {
  id = req.params.id
  try {
    if (!id) {
      Card.find({})
        .then(cards => res.status(200).send({ data: cards }))
        .catch(err => res.status(500).send({ message: err.message }));
    } else {
      Card.findById(id)
        .then((err, cards) => {
          if (err) {
            res.status(404).send({ message: err.message });
          }
          res.status(200).send({ data: cards });
        })
        .catch(err => res.status(500).send({ message: err.message }));
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
module.exports.post = (req, res) => {
  const name = req.body.name;
  const link = req.body.link;
  const likes = req.body.likes;
  const userId = req.user._id;

  try {
    Card.create({ name, link, owner: userId, likes })
      .then(card => res.status(201).send({ data: card }))
      .catch(err => res.status(400).send({ message: err.message }));
  } catch (err) {
    res.status(400).send({ mesage: err.message });
  }
};
module.exports.delete = (req, res) => {
  try {
    Card.findByIdAndDelete(req.params.id)
      .then(card => {
        res.status(200).send({ data: card });
      })
      .catch(err => res.status(404).send({ message: err.message }));
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports.like = (req, res) => {
  const cardId = req.params.id;
  const userId = req.user._id;

  try {
    Card.findByIdAndUpdate(
      cardId,
      {
        $addToSet: { likes: userId }
      },
      { new: true }
    )
      .then(card => res.status(200).send({ data: card }))
      .catch(err => res.status(404).send({ message: err.message }));
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports.unlike = (req, res) => {
  const cardId = req.params.id;
  const userId = req.user._id;

  try {
    Card.findByIdAndUpdate(
      cardId,
      {
        $pull: { likes: userId }
      },
      { new: true }
    )
      .then((error, res) => {
        res.status(401).send({ data: error });
      })
      .then(card => {
        res.status(200).send({ data: card });
      })
      .catch(err => res.status(404).send({ message: err.message }));
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
