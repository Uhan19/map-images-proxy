const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/map-and-images/business/:id", (req, res) => {
  console.log("it got inside the get");
  request(
    `http://localhost:3001/map-and-images/business/${req.params.id}`
  ).pipe(res);
});

router.get("/map-and-images/business/:id/photos", (req, res) => {
  request(
    `http://localhost:3001/map-and-images/business/${req.params.id}/photos`
  ).pipe(res);
});

module.exports = router;
