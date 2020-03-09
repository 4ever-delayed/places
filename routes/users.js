/* GET users listing. */
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const router = express.Router();
const userModule = require('../controllers/users');

router.get('/', userModule.getUsers);
router.get('/:id', userModule.getById);
router.post('/', userModule.createUser);
router.patch('/:id', userModule.updateProfile);
router.patch('/:id/avatar', userModule.updateAvatar);

module.exports = router;
