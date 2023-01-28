const { response } = require("express");
const fs = require("fs/promises");
const express = require("express");
const app = express();
const res = require("express/lib/response");
app.use(express.json());

async function test() {
  let map = {};
  try {
    const data = await fs.readFile("data/data.text", { encoding: "utf8" });
    const alphabet = data.replace(/[^A-Za-z']+/g, " ").trim();
    const lowerCase = alphabet.toLowerCase();

    const words = lowerCase.split(" ").filter((word) => word !== "");
    for (let i = 0; i < words.length; i++) {
      const item = words[i];
      if (item.length < 7) {
        map[item] = map[item] + 1 || item.length;
      }
    }
    const responseData = {
      count: words.length,
      words: map,
    };
    app.get("/words", (req, res) => {
      res.send(responseData);
    });
  } catch (err) {
    res.status(400).send("Not able to count!");
  }
}
test();
const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`listen port is ${port}`));
