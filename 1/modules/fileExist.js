const fs = require('fs')

const fileExist = function (req, res, next) {
    let method = req.method;
    let flag = fs.existsSync("test.json");
    if (method === "POST") {
      return flag
        ? res.status(500).json({ message: "File already created" })
        : next();
    }
    return flag
      ? next()
      : res.status(500).json({ message: "File is not found!" });
  };

module.exports = fileExist