const express = require("express");
const router = express.Router();
// const request = require("request");
const axios = require("axios");
const redis = require("redis");

let REDIS_PORT = process.env.REDIS_PORT;

let client = redis.createClient(REDIS_PORT);

function cacheBusiness(req, res, next) {
  const org = req.params.id;
  client.get(org, function(err, data) {
    if (err) throw err;
    if (data != null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
}

function cachePhoto(req, res, next) {
  const org = JSON.stringify(req.params.id + 1);
  client.get(org, function(err, data) {
    if (err) throw err;
    if (data != null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
}

// router.get("/map-and-images/business/:id", (req, res) => {
//   // request(`http://localhost:3001/map-and-images/business/${req.params.id}`)
//   request(`http://54.183.5.244:3001/map-and-images/business/${req.params.id}`)
//     .on("error", err => {
//       console.log(err);
//     })
//     .pipe(res);
// });

router.get("/map-and-images/business/:id", cacheBusiness, function(req, res) {
  axios
    .get(`http://54.183.5.244:3001/map-and-images/business/${req.params.id}`)
    .then(results => {
      client.setex(req.params.id, 3600, JSON.stringify(results.data));
      res.send(results.data);
    })
    .catch(err => {
      console.log(err);
      res.writeHead(404);
      res.end(JSON.stringify(err));
    });
});

// router.get("/map-and-images/business/:id/photos", (req, res) => {
//   // request(
//   //   `http://localhost:3001/map-and-images/business/${req.params.id}/photos`
//   // )
//   request(
//     `http://54.183.5.244:3001/map-and-images/business/${req.params.id}/photos`
//   )
//     .on("error", err => {
//       console.log(err);
//     })
//     .pipe(res);
// });

router.get("/map-and-images/business/:id/photos", cachePhoto, function(
  req,
  res
) {
  axios
    .get(
      `http://54.183.5.244:3001/map-and-images/business/${req.params.id}/photos`
    )
    .then(results => {
      var key = JSON.stringify(req.params.id + 1);
      client.setex(key, 3600, JSON.stringify(results.data));
      res.send(results.data);
    })
    .catch(err => {
      console.log(err);
      res.writeHead(404);
      res.end(JSON.stringify(err));
    });
});

module.exports = router;
