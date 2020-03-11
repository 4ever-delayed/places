const router = require("express").Router();
const User = require("../models/user");
const cards = require("../controllers/cards");

// router.get("/users/:userId", userGet); // возвращает пользователя по _id
// router.patch("/users/me", userProfilePatch); // обновляет профиль
// router.patch("/users/me/avatar", userProfileAvatarPatch); // обновляет аватар
//
//router.get("/cards", cards.get);
router.get("/cards/:id", cards.get);
router.post("/cards", cards.post);
router.delete("/cards/:id", cards.delete);
router.patch("/cards/:id/likes", cards.like);
router.delete("/cards/:id/likes", cards.unlike); // убрать лайк с карточки

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
