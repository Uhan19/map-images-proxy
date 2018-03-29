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

const clientBundles = "./public/services";
const serverBundles = "./templates/services";
const serviceConfig = require("./service-config.json");
const services = require("./loader.js")(
  clientBundles,
  serverBundles,
  serviceConfig
);

const React = require("react");
const ReactDom = require("react-dom/server");
const Html = require("./templates/html");
const App = require("./templates/app");
const Scripts = require("./templates/scripts");

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
};

router.get("/:id", function(req, res) {
  let components = renderComponents(services, { itemid: req.params.id });
  res.end(
    Html("Chompy Proxy", App(...components), Scripts(Object.keys(services)))
  );
});

router.get("/map-and-images/business/:id", cacheBusiness, function(req, res) {
  axios
    .get(`http://54.183.5.244:3001/map-and-images/business/${req.params.id}`) //before deployment change this to 54.183.5.244:3001
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
