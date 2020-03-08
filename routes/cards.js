const fs = require('promise-fs');
const express = require('express');

const router = express.Router();

const path = require('path');

const cardsPath = path.join(__dirname, '../data/card.json');
const getCards = (cardsPath) => fs.readFile(cardsPath);

const cards = getCards(cardsPath)
  .then((res) => JSON.parse(res))
  .catch((err) => console.error(err));


router.get('/', (req, res, next) => {
  cards.then((data) => res.send(res.send(data)))
    .catch((err) => console.error(err));
});

module.exports = router;
