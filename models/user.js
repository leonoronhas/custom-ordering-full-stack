const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*******************************************
 * USER SCHEMA:
 * Required fields:
 *      First & Last name, email, password
 * Reset token for reset password feature
 ******************************************/
const userSchema = new Schema({
  first_name:{
    type: String,
    required: true,
    minlength: 2
  },
  last_name:{
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    default: ""
  },
  resetTokenExpiration: {
    type: Date
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", userSchema);
