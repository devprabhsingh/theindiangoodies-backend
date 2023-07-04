const mongoose = require("mongoose");

const CoverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity_in_stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  select_quantity: {
    type: Array,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  fits: {
    type: Array,
    required: true,
  },
  img1: {
    type: String,
  },
  img2: {
    type: String,
  },
  img3: {
    type: String,
  },
});

module.exports = Cover = mongoose.model("cover", CoverSchema);
