const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }
    const hashpass = await bcrypt.hash(password, 10);
    const createuser = await User.create({
      fullname: fullname,
      email: email,
      password: hashpass,
    });

    res.status(200).json({
      message: "user created successfully",
      data: createuser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    const ismatch = await bcrypt.compare(password, user.password);
    if (!user || !ismatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    res.status(200).json({
      message: "login successfull",
      data: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};
