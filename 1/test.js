const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const fileName = "test.json";

app.use(express.json());

app.get("/", (req, res) => {
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

app.post("/", (req, res) => {
  fs.access(fileName, function (error) {
    if (error) {
      res.send(fs.writeFileSync("test.json", JSON.stringify(req.body)));
    } else {
      res.status(500).json({ message: "File already created" });
    }
  });
});

app.put("/", function (req, res) {
  let obj = req.body;
  fs.access(fileName, function (error) {
    if (error) {
      res.status(500).json({ message: "File is not found" });
    } else {
      let fileContent = fs.readFileSync(fileName, "utf8");
      let fileObj = JSON.parse(fileContent);
      for (let key in obj) {
        fileObj[key] = obj[key];
      }
      res.send(fs.writeFileSync(fileName, JSON.stringify(fileObj)));
    }
  });
});

app.delete("/", function (req, res) {
  fs.unlink(fileName, (err) => {
    if (err) {
      res.status(500).json({ message: "File is not found" });
    } else {
      res.status(201).json({ message: "File deleted!" });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
