const { json } = require("express");
const express = require("express");
const fs = require("fs/promises");
const app = express();
app.use(express.static("./public/ToDo-App-MVC-main"));
app.use(express.json());

app.post("/upload", (req, res) => {
  const data = JSON.stringify(req.body);
  fs.writeFile("./tasks.txt", data, (err) => {
    console.log(err);
  });
});

app.get("/download", async (req, res) => {
  try {
    const data = await fs.readFile("./tasks.txt");
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status = 500;
    res.send();
  }
  // fs.readFile("./tasks.txt", (err, data) => {
  //   res.send(data);
  // });
});
app.listen(9000, () => {
  console.log("listening on port 9000" + "\t" + "http://127.0.0.1:9000");
});
