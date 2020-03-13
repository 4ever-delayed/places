const Card = require("../models/card");
const { ObjectId } = require("mongodb");
  async function getCard(req, res, next) {
  const card = await Card.findById(req.params.id);
  if(!ObjectId.isValid(req.user._id)){
    res.status(400).json({message: "Bad request : user id not match to mongodb standart"})
  }
  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json({message : "Bad request: wrong card id"})
  }
  try {
    if (card == null) {
      await res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    await res.status(500).json({ message: err.message });
  }

  res.user = card;
  next();
}
module.exports = { getCard }
