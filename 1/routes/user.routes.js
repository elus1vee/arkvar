const Router = require("express");
const router = new Router();
const UserController = require("../controllers/user.controller");
const userExist = require('../modules/userExist')
const fileExist = require('../modules/fileExist')
const fs = require('fs')
const path = require("path");

const usersFile = "users.json";
const fileName = 'test.json';

const userController=require('../controllers/user.controller')

router.get("/", fileExist, (req, res) => {
  let options = {
    root: path.join("C:/Users/sasha/OneDrive/Рабочий стол/Arkvar/1"),
  };
  console.log(options)
  res.sendFile("test.json",options, function (err) {
    if (err) {
      res.status(500).json({ message: "File is not found." });
    } else {
      console.log("Sent:", fileName);
    }
  });
});

router.post("/", [userExist, fileExist], (req, res) => {
  res.send(fs.writeFileSync("test.json", JSON.stringify(req.body)));
});

router.put("/", [userExist, fileExist], function (req, res) {
  let obj = req.body;
  let fileContent = fs.readFileSync(fileName, "utf8");
  let fileObj = JSON.parse(fileContent);
  for (let key in obj) {
    fileObj[key] = obj[key];
  }
  res.send(fs.writeFileSync(fileName, JSON.stringify(fileObj)));
});

router.delete("/", [userExist, fileExist], function (req, res) {
  fs.unlink(fileName, (err) => {
    if (err) {
      res.status(500).json({ message: "File is not found" });
    } else {
      res.status(201).json({ message: "File deleted!" });
    }
  });
});

// router.post("/users", (req, res) => {
//   let obj = req.query;
//   let fileContent = fs.readFileSync("users.json", "utf8");
//   let usersObj = JSON.parse(fileContent);
//   usersObj["users"].push(obj);
//   res.send(fs.writeFileSync(usersFile, JSON.stringify(usersObj)));
// });
router.post("/users", userController.createUser);

module.exports = router