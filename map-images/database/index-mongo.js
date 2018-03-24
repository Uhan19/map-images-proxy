const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
mongoose.connect("mongodb://nick:giri@13.57.17.251/mapimages");

const Schema = mongoose.Schema;

const businessSchema = new Schema(
  {
    _id: Number,
    business_id: Number,
    neighborhood: String,
    address: String,
    city: String,
    state: String,
    postal_code: String,
    longitude: String,
    latitude: String,
  },
  { collection: "business" }
);

const photoSchema = new Schema(
  {
    _id: Number,
    id: Number,
    business_id: String,
    caption: String,
    label: String,
    date: String,
  },
  { collection: "photo" }
);

const Business = mongoose.model("Business", businessSchema);
const Photo = mongoose.model("Photo", photoSchema);

module.exports = { Business: Business, Photo: Photo };
