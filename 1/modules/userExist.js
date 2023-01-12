const fs = require('fs')
const db = require("../db")
async function userExist (req, res, next) {
    let user = req.query;
    let usersArr = await db.query('SELECT * FROM users');
    usersArr = usersArr.rows;
    let flag = false;
    usersArr.forEach((el) => {
      if (el.username === user.username && el.passwords === user.passwords) flag = true;
    });
    return flag
      ? next()
      : res.status(500).json({ message: "User is not found!" });
  };

  module.exports = userExist;