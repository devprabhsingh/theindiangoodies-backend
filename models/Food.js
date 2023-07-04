const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true,
  },
  img1: {
    type: String,
  },
});

module.exports = Food = mongoose.model("food", FoodSchema);
