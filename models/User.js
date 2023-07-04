const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  items_ordered: {
    type: Object,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
