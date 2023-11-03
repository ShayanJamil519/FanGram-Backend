const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, authId, inviteCode, type } = req.body;
    let hashedPassword;

    if (!username || !email || !type) {
      return res.json({ status: false, message: "Incomplete Details!" });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ status: false, message: "Email already in used" });
    }

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await User.create({
      email,
      username,
      password: password ? hashedPassword : "",
      authId: authId ? authId : "",
      inviteCode: inviteCode ? inviteCode : "",
      type: type,
    });

    return res.json({ status: true, message: "Registeration Successfull!" });
  } catch (ex) {
    return res.json({ status: false, message: ex.message });
  }
};

//   module.exports.login = async (req, res, next) => {
//     try {
//       const { email, password } = req.body;

//       const user = await User.findOne({ email });

//       if (!user) {
//         return res.json({
//           message: "Incorrect email or password",
//           status: false,
//         });
//       }

//       const isPasswordValid = await bcrypt.compare(password, user.password);

//       if (!isPasswordValid) {
//         return res.json({
//           message: "Incorrect email or password",
//           status: false,
//         });
//       }

//       return res.json({
//         status: true,
//         userId: user._id,
//         token: `Bearer ${generateToken(user._id.toString())}`,
//       });
//     } catch (ex) {
//       return res.json({ status: false, message: ex.message });
//       next(ex);
//     }
//   };
