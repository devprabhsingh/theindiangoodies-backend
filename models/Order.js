const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerData: {
    type: Object,
  },
  itemsOrdered: {
    type: Object,
  },
  orderStatus: {
    type: String,
  },
  trackId: {
    type: String,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
