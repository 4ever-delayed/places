// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const router = express.Router();
const cards = require("../controllers/cards");
const { getCards } = require("../middleware/cards");

// Get all users.js
router.get("/", cards.get);
// Create card
router.post("/",getCards, cards.post);
// Get one user
router.get("/:id", getCards, (req, res) => {
  res.json(res.card);
});

// Delete one card

router.delete("/:id", getCards, cards.delete);

// Like Card

router.patch("/:id/likes/", getCards, cards.like);

// unlike card

router.delete("/:id/likes/", getCards, cards.unlike);

module.exports = router;
