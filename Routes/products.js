const model = require("../DBModels/mongooseModels");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "productImages");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

var upload = multer({ dest: "uploads/" });

router.get("/", async (req, res) => {
  try {
    const products = await model.Product.find({});
    const procesedProducts = products.map((product) => {
      return {
        _id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        availableSizes: product.availableSizes,
        img: new Buffer(product.img.data).toString("base64"),
      };
    });
    // console.log(procesedProducts);
    return res.send(procesedProducts);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.post("/", upload.single("img"), async (req, res) => {
  try {
    const product = {
      img: {
        data: fs.readFileSync(path.join("uploads/" + req.file.filename)),
        content: "image/png",
      },
      title: req.body.title,
      description: req.body.description,
      availableSizes: req.body.availableSizes,
      price: req.body.price,
    };
    const newProduct = new model.Product(product);
    const savedProduct = await newProduct.save();
    console.log(savedProduct.img.data.toString("base64"));
    return res
      .status(201)
      .json({ msg: `product saved. id : ${savedProduct._id}` });
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
