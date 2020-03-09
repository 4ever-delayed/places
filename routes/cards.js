// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const router = express.Router();
const cardModule = require('../controllers/cards');

router.get('/', cardModule.getCards);

router.post('/', cardModule.createCard);

router.delete(cardModule.deleteCard, '/:id');
router.delete('/:id/likes', cardModule.unlike);

router.put('/:id/likes', cardModule.like);

module.exports = router;
