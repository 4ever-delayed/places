const express = require('express');

const router = express.Router();

/* GET users listing. */
const { getUsers, getById, createUser, updateProfile, updateAvatar } = require('../controllers/users')

router.get('/', getUsers);
router.get('/:id',getById);
router.post('/', createUser);
router.patch('/:id',updateProfile);
router.patch('/:id/avatar', updateAvatar);

module.exports = router;
