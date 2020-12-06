const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*******************************************
 * USER SCHEMA:
 * Required fields:
 *      Email, password
 * Reset token for reset password feature
 ******************************************/
const userSchema = new Schema({
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
    default: "",
  },
  resetTokenExpiration: {
    type: Date,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
