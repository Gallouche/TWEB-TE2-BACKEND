// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const userModelSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchlist: {
    type: Array,
    default: [],
  },
});


const userModel = mongoose.model('user', userModelSchema);

module.exports = userModel;
