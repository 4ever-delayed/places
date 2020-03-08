const fs = require('promise-fs');
const express = require('express');

const router = express.Router();

/* GET users listing. */
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');

const getUsers = (path) => fs.readFile(path);


router.get('/', (req, res, next) => {
  getUsers(usersPath).then((data) => res.json(JSON.parse(data)))
    .catch((err) => console.error(err));
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  getUsers(usersPath)
    .then((data) => JSON.parse(data))
    .then((data) => data.find((user) => {
      if (user._id === id) res.send(res.json(user));
      else res.json(res.status(404));
    }))
    .catch((err) => res.status(404).send({ message: 'id пользователя не найден' }));
});


module.exports = router;
