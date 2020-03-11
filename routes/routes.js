const router = require("express").Router();
const User = require("../models/user");
// get all users
router.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    await res.json(data);
  } catch (err) {
    await res.status(500).json({ message: err.message });
  }
});

// Create one user

router.post("/users", async (req, res) => {
  const user = new User({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar
  });

  try {
    const newUser = await user.save();
    await res.status(201).json(newUser);
  } catch (err) {
    await res.status(400).json({ message: err.message });
  }
});

// router.get("/users/:userId", userGet); // возвращает пользователя по _id
// router.patch("/users/me", userProfilePatch); // обновляет профиль
// router.patch("/users/me/avatar", userProfileAvatarPatch); // обновляет аватар
//
// router.get("/cards", cardsGet); // возвращает все карточки
// router.post("/cards", cardPost); // создаёт карточку
// router.delete("/cards/:cardId", cardDelete); // удаляет карточку по идентификатору
// router.put("/cards/:cardId/likes", cardLikePut); // поставить лайк карточке
// router.delete("/cards/:cardId/likes", cardLikeDelete); // убрать лайк с карточки

// router.get("*", async (req, res) => {
//   await res.status(404).json({ message: "Запрашиваемый ресурс не найден" });
// });

async function getUser(req, res, next) {
  const user = await User.findById(req.params.id);
  try {
    if (user == null) {
      await res.status(404).json({ message: "Пользователь не найден" });
    }
  } catch (err) {
    await res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

router.get("/users/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Update one subscriber
router.patch("/:id", getUser, async (req, res) => {});

// Delete one subscriber
router.delete("/:id", getUser, async (req, res) => {});

module.exports = router;
