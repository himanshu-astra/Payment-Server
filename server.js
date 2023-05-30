require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());

app.listen(3001, () => {
  console.log("SERVER STARTED");
});

app.post("/payment", async (req, res) => {
  // Get all products on server
  // Get id and qunatity from client
  // Get price of each item from step1 result (Filter and find price)
  // Total Amount for each item => quantity * price_for_this_item
  // Add total for all items, payableAmount

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000, // payableAmount
      currency: "inr",
      payment_method_types: ["card"],
      metadata: {
        additionalInfo: "UserID",
      },
    });
    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ success: false, error: "DEF" });
  }
});
