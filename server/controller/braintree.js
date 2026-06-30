// Bank Transfer Only – No Braintree Needed
require("dotenv").config();

class BankTransferController {
  // Instead of generating token, simply return "Bank Transfer"
  ganerateToken(req, res) {
    return res.json({
      paymentMethod: "Bank Transfer",
      message: "Braintree disabled. Bank Transfer is the only payment method.",
    });
  }

  // Payment processing for bank transfer (manual)
  paymentProcess(req, res) {
    const { amountTotal } = req.body;

    return res.json({
      success: true,
      message: "Order placed successfully. Complete payment via bank transfer.",
      amount: amountTotal,
      paymentStatus: "Pending",
      paymentMethod: "Bank Transfer",
    });
  }
}

const bankTransferController = new BankTransferController();
module.exports = bankTransferController;
