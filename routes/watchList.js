const express = require('express');
const mongoose = require('mongoose');
const User = require('./../model/userModel');

const router = express.Router();


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
	const userId = req.get('userId');

	User.findById(userId, (err, doc) => {
		if (err) {
			const error = new Error('Cannot add movie to watchlist');
			error.status = 500;
			next(error);
		} else {
			res.send(doc.watchlist);
		}
	});
});

router.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
	const movie = req.body;
	const userId = req.get('userId');
	User
		.findByIdAndUpdate(userId, { $addToSet: { watchlist: movie } },
			{ new: true }, (err, doc) => { // eslint-disable-line no-unused-vars
				if (err) {
					const error = new Error('Cannot add movie to watchlist');
					error.status = 500;
					next(error);
				} else {
					res.status(201).send(`Movie ${movie.title} added !`);
				}
		});
});
module.exports = router;
