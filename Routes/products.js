const model = require("../DBModels/mongooseModels");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await model.Product.find({});
    return res.send(products);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = new model.Product(req.body);
    const savedProduct = await newProduct.save();
    return res.send(savedProduct);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await model.Product.findByIdAndDelete(req.params.id);
    return res.send(deletedProduct);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});
module.exports = router;
