const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(express.json());

app.get("/", (req, res) => {
  var options = {
    root: path.join(__dirname),
  };

  var fileName = "test.json";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.post("/", (req, res) => {
  res.send(fs.writeFileSync("test.json", JSON.stringify(req.body)));
});

app.put("/", function (req, res) {
  let obj = req.body;
  let fileContent = fs.readFileSync("test.json", "utf8");
  let fileObj = JSON.parse(fileContent);
  for (let key in obj) {
    fileObj[key] = obj[key];
  }
  res.send(fs.writeFileSync("test.json", JSON.stringify(fileObj)));
});

app.delete("/", function (req, res) {
  fs.unlink("test.json", (err) => {
    if (err) throw err;
    console.log("File deleted!");
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
