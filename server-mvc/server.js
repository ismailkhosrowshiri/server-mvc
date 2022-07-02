const { json } = require("express");
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.static("./public/ToDo-App-MVC-main"));
app.use(express.json());

app.listen(9000, () => {
  console.log("Listening on the 9000");
});

app.post((req, res) => {
  const data = JSON.stringify(req.body);
  fs.writeFile("./tasks.txt", data, (err) => {
    console.log(err);
  });
});

app.get((req, res) => {
  fs.readFile("./tasks.txt", (err, data) => {
    res.send(data);
  });
});
