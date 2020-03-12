const router = require("express").Router();
const cards = require("../controllers/cards");
const { getCard } = require("../middleware/cards");

// router.get("/users/:userId", userGet); // возвращает пользователя по _id
// router.patch("/users/me", userProfilePatch); // обновляет профиль
// router.patch("/users/me/avatar", userProfileAvatarPatch); // обновляет аватар
//
// Get all users
router.get("/cards", cards.get);
// Create card
router.post("/cards", cards.post);
// Get one user
router.get("/cards/:id", getCard, (req, res) => {
  res.json(res.card);
});

// Delete one card

router.delete("/cards/:id", getCard, async (req, res) => {
  try {
    await res.card.delete();
    res.json({ message: "Карточка была удалена" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like Card

router.patch("/cards/:id", getCard, async (req, res) => {
  const userId = req.user._id;
  await res.card.likes.addToSet(userId);
  try {
    const updatedCard = await res.card.save();
    res.json(updatedCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // Update one subscriber
// router.patch('/cards/:id', getSubscriber, async (req, res) => {
// })
//
// // Delete one subscriber
// router.delete('/cards/:id', getSubscriber, async (req, res) => {
// })
// router.delete("/cards/:id", cards.delete);
// router.patch("/cards/:id/likes", cards.like);
// router.delete("/cards/:id/likes", cards.unlike); // убрать лайк с карточки

// router.get("*", async (req, res) => {
//   await res.status(404).json({ message: "Запрашиваемый ресурс не найден" });
// });
//
// router.get("/users/:id",users.getUser,async (req,res) => {
//   await res.json(res.user);
// });

// // Update one subscriber
// router.patch("/:id", getUser, async (req, res) => {});
//
// // Delete one subscriber
// router.delete("/:id", getUser, async (req, res) => {});

module.exports = router;
