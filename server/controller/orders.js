const orderModel = require("../models/orders");

class Order {
  // GET all orders (admin)
  async getAllOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });

      return res.json({ Orders });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // GET orders for a single user
  async getOrderByUser(req, res) {
    let { uId } = req.body;

    if (!uId) {
      return res.json({ message: "User ID is required" });
    }

    try {
      let Order = await orderModel
        .find({ user: uId })
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });

      return res.json({ Order });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // CREATE NEW ORDER
  async postCreateOrder(req, res) {
    let { allProduct, user, amount, address, phone } = req.body;

    if (!allProduct || !user || !amount || !address || !phone) {
      return res.json({ message: "All fields are required" });
    }

    try {
      let newOrder = new orderModel({
        allProduct,
        user,
        amount,
        address,
        phone,
        transactionId: "COD",
        status: "Not processed"
      });

      let save = await newOrder.save();

      return res.json({
        success: true,
        message: "Order placed successfully",
        order: save
      });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Order creation failed" });
    }
  }

  // UPDATE ORDER STATUS
  async postUpdateOrder(req, res) {
    let { oId, status } = req.body;

    if (!oId || !status) {
      return res.json({ message: "Order ID & Status are required" });
    }

    try {
      await orderModel.findByIdAndUpdate(oId, {
        status,
        updatedAt: Date.now()
      });

      return res.json({ success: "Order updated successfully" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to update order" });
    }
  }

  // DELETE ORDER
  async postDeleteOrder(req, res) {
    let { oId } = req.body;

    if (!oId) {
      return res.json({ error: "Order ID is required" });
    }

    try {
      await orderModel.findByIdAndDelete(oId);
      return res.json({ success: "Order deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Failed to delete order" });
    }
  }
}

module.exports = new Order();
