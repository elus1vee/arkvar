const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const fileName = "test.json";
const usersFile = "users.json";

const fileExist = function (req, res, next) {
  let method = req.method;
  let flag = fs.existsSync("./test.json");
  if (method === "POST") {
    return flag
      ? res.status(500).json({ message: "File already created" })
      : next();
  }
  return flag
    ? next()
    : res.status(500).json({ message: "File is not found!" });
};

const userExist = function (req, res, next) {
  let user = req.query;
  let fileContent = fs.readFileSync(usersFile, "utf8");
  let usersArr = JSON.parse(fileContent).users;
  let flag = false;
  usersArr.forEach((el) => {
    if (el.username === user.username && el.passwords === user.passwords) flag = true;
  });
  return flag
    ? next()
    : res.status(500).json({ message: "User is not found!" });
};

const middlewareCompose = function(arrFunc){

}
// app.use(userExist);
// app.use(fileExist);
app.use(express.json());

app.get("/", fileExist,(req, res) => {
  let options = {
    root: path.join(__dirname),
  };

  res.sendFile(fileName, options, function (err) {
    if (err) {
      res.status(500).json({ message: "File is not found." });
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.post("/",[userExist,fileExist], (req, res) => {
  res.send(fs.writeFileSync("test.json", JSON.stringify(req.body)));
});

app.put("/",[userExist,fileExist] ,function (req, res) {
  let obj = req.body;
  let fileContent = fs.readFileSync(fileName, "utf8");
  let fileObj = JSON.parse(fileContent);
  for (let key in obj) {
    fileObj[key] = obj[key];
  }
  res.send(fs.writeFileSync(fileName, JSON.stringify(fileObj)));
});

app.delete("/", [userExist,fileExist],function (req, res) {
  fs.unlink(fileName, (err) => {
    if (err) {
      res.status(500).json({ message: "File is not found" });
    } else {
      res.status(201).json({ message: "File deleted!" });
    }
  });
});

app.post("/users", (req, res) => {
  let obj = req.query;
  let fileContent = fs.readFileSync(usersFile, "utf8");
  let usersObj = JSON.parse(fileContent);
  usersObj["users"].push(obj);
  res.send(fs.writeFileSync(usersFile, JSON.stringify(usersObj)));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
