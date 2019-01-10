const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./../config');


const UserModel = require('../model/userModel');


const router = express.Router();
const app = express();
app.set('secret', config.secret);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  res.sendFile('./../views/login.html');
});

router.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  const { username, password } = req.body;

  UserModel.findOne({ username }, (err, user) => {
    if (user) {
      if (user.password !== password) {
        const error = new Error('Wrong password !');
        error.status = 500;
        return next(error);
      }
      // Génération du JWT avec le userID de MongoDB
      const userId = user.id;
      const payload = { userId };
      const token = jwt.sign(payload, app.get('secret'), {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
      });
      // return the information including token as JSON
      res.json({
        success: true,
        token,
      });
    } else {
      const error = new Error('User not found');
      error.status = 500;
      return next(error);
    }
  });
});

module.exports = router;
