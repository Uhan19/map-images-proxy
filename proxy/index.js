const express = require("express");
const morgan = require("morgan");
const path = require("path");
var bodyParser = require("body-parser");
var router = require("./router.js");
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use("/:id", express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
