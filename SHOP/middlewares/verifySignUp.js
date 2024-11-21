// middlewares/verifySignUp.js

const db = require("../models");
const User = db.User;
const Role = db.Role;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // เช็ค username
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
      return res.status(400).send({ message: "Username is already taken!" });
    }

    // เช็ค email
    const email = await User.findOne({ where: { email: req.body.email } });
    if (email) {
      return res.status(400).send({ message: "Email is already in use!" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

checkRolesExisted = (req, res, next) => {
  const roles = req.body.roles;

  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!Role.includes(roles[i])) {
        return res.status(400).send({ message: `Role ${roles[i]} does not exist!` });
      }
    }
  }

  next();
};

module.exports = { checkDuplicateUsernameOrEmail, checkRolesExisted };
