const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./../model/usersModel');

const router = express.Router();


mongoose.connect(process.env.MONGODB_URI);

/* GET users listing. */
router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  UserModel.findOne({ email: 'jean-pierre@gamil.com' }, (err, user) => {
    if (err) {
      const error = new Error('Error while getting user');
      error.status = 500;
      return next(error);
    }
    if (user) {
      res.send(user);
    } else {
      const error = new Error('No user found');
      error.status = 500;
      next(error);
    }
  });
});

router.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  UserModel.find({ email: req.body.email }, (err, doc) => {
    console.log(req.body)
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
