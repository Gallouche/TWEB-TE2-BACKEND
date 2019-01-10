const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./../model/movieModel');

const router = express.Router();


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  res.send('Select page in url !');
});

router.get('/:page', (req, res, next) => { // eslint-disable-line no-unused-vars
	const perPage = 10;
	const page = req.params.page || 1;

	Movie
		.find({})
		.skip((perPage * page) - perPage)
		.limit(perPage)
		.exec((err, movies) => {
			res.send(movies);
		});
});

module.exports = router;
