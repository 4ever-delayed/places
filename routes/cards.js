const express = require('express');

const router = express.Router();
const {unlike, like, deleteCard, createCard, getCards} = require('../controllers/cards')

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:id', deleteCard);
router.delete('/:id/likes', unlike);

router.put('/:id/likes', like);

module.exports = router;
