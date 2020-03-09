const User = require('../models/user');
const { ObjectId } = require('mongodb');

const getUsers = (req, res,next) => {
   const message = {message :'500, Ошибка в выводе списка пользователей - попробуйте позже'}
   User.find({},function (data) {
        return data.json
   })
     .then(data => res.send({ data : data}))
     .catch(err => res.status(500).send({
       error: message
     }))
     next();
};

// get user by id
const getById = (req, res) => {
    const message = { message: '500 Произошла ошибка в выводе пользователя'}
    const id = req.params.id;
  if (ObjectId.isValid(id)){
     User.findById({id : id})
       .then(data => res.send({data: data}))
      .catch(error => res.status(500).send({
          error: message
      }))
  }
};

const updateProfile = (req, res , next) => {
  const userId = req.user._id
  const message = { message: '500 Произошла ошибка в выводе пользователя'}
  const { name, about, avatar } = req.body;
  const options = { runValidators: true, new: true };
  User.findByIdAndUpdate(
    userId,
    { name, about ,avatar},
    options
  )
. then(data => res.send({ data : data}))
    .catch(error => res.status(500).send({
      error: message
    }))
  next()
};


const updateAvatar = (req, res,next) => {
  const id = req.user._id
  const {avatar} = req.body;
  const message = {message: '500, ошибка обновления, попроуйте позже'}
  const options = {runValidators: true, new: true}
  User.findByIdAndUpdate(id,{avatar},options)
    .then(data => res.send({data: data}))
    .catch(error => res.status(500).send({
      error: message
    }))
  next()
}

// создаёт пользователя
const createUser = (req, res, next) => {
  const {name, about, avatar} = req.body;
  const message = {message: '500, ошибка создания, попроуйте позже'}
  User.createUser(req,res)
    .then(data => res.send({data: data}))
    .catch(error => res.status(500).send({
      error: message
    }))

  next()
}
module.exports = {
                 getUsers,
                  getById,
                 createUser,
                  updateProfile,
                  updateAvatar
};