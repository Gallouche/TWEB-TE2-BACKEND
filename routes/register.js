const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../model/userModel');

const router = express.Router();


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  res.send('register');
});

/* POST new user. */
router.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
	const newUser = new UserModel(req.body);
	newUser.save((err) => {
		if (err) {
			const error = new Error('Could create new user (maybe already existing ? or missing username or password)');
			error.status = 500;
			next(error);
		} else {
			res.status(201).send('Created');
		}
	});
});

module.exports = router;
