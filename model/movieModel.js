// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const movieModelSchema = new Schema({
	vote_count: Number,
	video: Boolean,
	vote_average: Number,
	title: String,
	popularity: Number,
	poster_path: String,
	original_language: String,
	original_title: String,
	backdrop_path: String,
	adult: Boolean,
	overview: String,
	release_date: String,
	tmdb_id: Number,
	genres: Array,
});


const movieModel = mongoose.model('movies', movieModelSchema);

module.exports = movieModel;
