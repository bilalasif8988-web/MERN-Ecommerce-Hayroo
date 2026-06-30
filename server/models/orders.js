const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    allProduct: [
      {
        id: { type: ObjectId, ref: "Products" }, // FIXED
        quantity: Number,
      },
    ],

    user: {
      type: ObjectId,
      ref: "Users", // FIXED
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    transactionId: {
      type: String,
      default: "COD",
    },

    address: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Not processed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema); // FIXED
