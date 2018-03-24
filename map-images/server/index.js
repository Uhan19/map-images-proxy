require("newrelic");
import express from "express";
import bodyParser from "body-parser";
import path from "path";

import database from "./../database";

import { businessRoute } from "./routes/businessRoute";

let app = express();

app.get("/bundle.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/dist/bundle.js"));
});

app.use("/:id", express.static(__dirname + "/../client/dist"));

app.use("/map-and-images/business", businessRoute);

let port = process.env.port || 3001;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
