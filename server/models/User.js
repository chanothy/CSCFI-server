const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  // this is what you input into the authenticator
  tfaToken: {
    type: String,
  },
  // this is the id you send the 6 number code to
  tfaTokenId: {
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = {
  User: userModel,
};
