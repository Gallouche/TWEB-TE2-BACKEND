const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./../model/usersModel');

const router = express.Router();


mongoose.connect(process.env.MONGODB_URI);

/* GET users listing. */
router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  res.send('respond with  resource');
});

router.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  UserModel.find({ email: req.body.email }, (err, doc) => {
    if (doc.length) {
      const error = new Error('User already exist');
      error.status = 500;
      return next(error);
    }
    const newUser = new UserModel(req.body);

    newUser.save((errSave) => {
      if (errSave) {
        const error = new Error('Could not save new user');
        error.status = 500;
        next(error);
      } else {
        res.send('New user saved');
      }
    });
  });
});

module.exports = router;
