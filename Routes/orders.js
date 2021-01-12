const model = require("../DBModels/mongooseModels");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await model.Order.find({});
    return res.send(orders);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const order = await new model.Order(req.body);
    const orderSaved = await order.save();
    return res.send(orderSaved);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const orderDeleted = await model.Order.findByIdAndDelete(req.params.id);
    return res.send(orderDeleted);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
