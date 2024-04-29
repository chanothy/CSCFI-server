const { User } = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { missingFields, userAlreadyExists, success } = require("../utils/HTTPCodes.js");
const salt = 11;

const login = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Account does not exist." });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Password is invalid." });
  }
  if (role != user.role) {
    return res.status(400).json({ message: "Account does not exist." });
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.userKEY
  );
  return res.json({ login: true, token: token });
};

const registration = async (req, res) => {
  const { email, password, role, firstname, lastname } = req.body;
  console.log("registration trigger")
  if (email && password && firstname && lastname) {
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(userAlreadyExists)
        .json({ message: "User is already registered" });
      console.log("Error: User is already registered");
      return;
    }

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: hashPassword,
      role: role,
    });

    await newUser.save();
    console.log("Success: User created with registration");
    return res
      .status(success)
      .json({ message: "User created with registration" });
  } else {
    console.log("Error: Missing fields");
    return res.status(missingFields).json({ message: "Missing fields" });
  }
};

module.exports = {
  login,
  registration,
};
