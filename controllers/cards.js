// eslint-disable-next-line import/no-extraneous-dependencies
const objectId = require("mongodb").ObjectID;
const Card = require("../models/card");

module.exports.get = async (req, res) => {
  try {
    const cards = await Card.find();
    await res.json(cards);
  } catch (err) {
    await res.status(500).json({ message: err.message });
  }
};

module.exports.post = async (req, res) => {
  const card = new Card({
    name: req.body.name,
    link: req.body.link,
    // eslint-disable-next-line no-underscore-dangle
    owner: req.user._id,
    likes: req.body.likes
  });

  try {
    const newCard = await card.save();
    await res.status(201).json(newCard);
  } catch (err) {
    await res.status(400).json({ message: err.message });
  }
};
// module.exports.like = (req, res) => {
//   const cardId = req.params.id;
//   const userId = req.user._id;
//
//   try {
//     Card.findByIdAndUpdate(
//       cardId,
//       {
//         $addToSet: { likes: userId }
//       },
//       { new: true }
//     )
//       .then(card => res.status(200).send({ data: card }))
//       .catch(err => res.status(404).send({ message: err.message }));
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// };
//
module.exports.like = async (req, res) => {
  const userId = req.user._id;
  await res.card.likes.addToSet(userId);
  try {
    const updatedCard = await res.card.save();
    res.json(updatedCard);
  } catch {
    res.status(400).json({ message: err.message });
  }
};
// module.exports.delete = (req, res) => {
//   try {
//     Card.findByIdAndDelete(req.params.id)
//       .then(card => {
//         res.status(200).send({ data: card });
//       })
//       .catch(err => res.status(404).send({ message: err.message }));
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// };
//

// module.exports.unlike = (req, res) => {
//   const cardId = req.params.id;
//   const userId = req.user._id;
//
//   try {
//     Card.findByIdAndUpdate(
//       cardId,
//       {
//         $pull: { likes: userId }
//       },
//       { new: true }
//     )
//       .then((error, res) => {
//         res.status(401).send({ data: error });
//       })
//       .then(card => {
//         res.status(200).send({ data: card });
//       })
//       .catch(err => res.status(404).send({ message: err.message }));
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// };
