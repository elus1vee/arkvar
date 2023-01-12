const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const router = require('./routes/user.routes')

app.use(express.json());
app.use("/", router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
