const User = require("../models/user");

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
module.exports = {getUser}
