const mongoose = require("mongoose");
const shortid = require("shortid");

const Product = mongoose.model(
  "Products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    image: String,
    title: String,
    description: String,
    availableSizes: [String],
    price: Number,
  })
);

const Order = mongoose.model(
  "Orders",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    totalPrice: Number,
    name: String,
    email: String,
    address: String,
    cartItems: [
      {
        _id: String,
        title: String,
        count: Number,
        price: Number,
      },
    ],
  })
);

const User = mongoose.model(
  "Users",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    displayName: String,
    email: String,
    type: String,
    passwordHash: String,
    address: [
      {
        _id: { type: String, default: shortid.generate },
        addressName: String,
        street: String,
        city: String,
        state: String,
        zip: String,
        fav: String,
        usps: String,
      },
    ],
    card: [
      {
        _id: { type: String, default: shortid.generate },
        cardName: String,
        number: String,
        expiry: String,
        CVV: String,
        fav: String,
      },
    ],
  })
);

module.exports.Product = Product;
module.exports.Order = Order;
module.exports.User = User;
