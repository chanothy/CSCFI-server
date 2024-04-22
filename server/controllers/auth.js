const { User } = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;

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
  if (user.tfaTokenId) {
    tfaId = user.tfaTokenId;
  } else {
    tfaId = null;
  }

  if (tfaId == null) {
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.userKEY
    );
    res.cookie("session-token", token);
    return res.json({ login: true });
  } else {
    const token = jwt.sign(
      { _id: user._id, role: user.role, tfa: tfaId },
      process.env.userKEY
    );
    res.cookie("temp-session-token", token);
    return res.json({ login: false, token: token, tfa: true });
  }
};

const registration = async (req, res) => {
  const { email, password, role, firstname, lastname } = req.body;

  if (email && password && role && firstname && lastname) {
    // looks for existing user else break
    if (role === "learner" || role === "teacher") {
      const user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ message: "User is already registered." });
        console.log("User is already registered.");
        return;
      }
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
    console.log("User created with registration.");
    return res.status(200).json({ message: "Account created." });
  } else {
    console.log("Error: missing fields");
    return res
      .status(400)
      .json({ message: "Please fill in all required fields." });
  }
};

module.exports = {
  login,
  registration,
};
