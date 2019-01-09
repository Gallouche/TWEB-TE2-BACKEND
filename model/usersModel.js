// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const userModelSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
});


const userModel = mongoose.model('user', userModelSchema);

module.exports = userModel;
