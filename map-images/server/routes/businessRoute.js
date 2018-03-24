import express from "express";
// const database = require("./../../database/index.js");
const test = require("./../../database/index-mongo.js");
import redis from "redis";

let businessRoute = express.Router();

/*---------------------Redis---------------------------*/
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
/*--------------------MongoDB Routing---------------------*/
businessRoute.get("/:id", cacheBusiness, (req, res) => {
  let numberId = req.params.id * 1;
  test.Business.find({ _id: numberId }).then(results => {
    client.setex(req.params.id, 3600, JSON.stringify(results));
    res.send(results);
  });
});

businessRoute.get("/:id/photos", cachePhoto, (req, res) => {
  test.Photo.find({ _id: req.params.id }).then(results => {
    var key = JSON.stringify(req.params.id + 1);
    client.setex(key, 3600, JSON.stringify(results));
    res.send(results);
  });
});

/*--------------------MySQL Routing----------------------*/

// businessRoute.get("/:id", (req, res) => {
//   //add cacheBusiness as 2nd args for redis
//   database
//     .query(
//       `
// 		SELECT * FROM business WHERE id='${req.params.id}' LIMIT 1;
// 	`
//     )
//     .then(data => {
//       // console.log(data[0][0]);
//       return data[0][0];
//     })
//     .then(business => {
//       // client.setex(req.params.id, 3600, JSON.stringify(business));
//       res.send(business);
//     })
//     .catch(error => {
//       console.error(error);
//       res.end();
//     });
// });

// businessRoute.get("/:id/photos", (req, res) => {
//   //add cachePhoto as 2nd args for redis
//   database
//     .query(
//       `
// 		SELECT * FROM photo2 WHERE unique_id='${req.params.id}' LIMIT 64;
// `
//     )
//     .then(data => {
//       return data[0];
//     })
//     .then(photos => {
//       // var key = JSON.stringify(req.params.id + 1);
//       // client.setex(key, 3600, JSON.stringify(photos));
//       res.send(photos);
//     })
//     .catch(error => {
//       console.error(error);
//       res.end();
//     });
// });

export { businessRoute };
