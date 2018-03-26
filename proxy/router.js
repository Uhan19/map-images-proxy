const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/map-and-images/business/:id", (req, res) => {
  request(`http://localhost:3001/map-and-images/business/${req.params.id}`)
    .on("error", err => {
      console.log(err);
    })
    .pipe(res);
});

router.get("/map-and-images/business/:id/photos", (req, res) => {
  request(
    `http://localhost:3001/map-and-images/business/${req.params.id}/photos`
  )
    .on("error", err => {
      console.log(err);
    })
    .pipe(res);
});

module.exports = router;
