const productsRouter = require("./Routes/products");
const orderRouter = require("./Routes/orders");
const userRouter = require("./Routes/users");
const addressRouter = require("./Routes/address");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv/config");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose
  .connect(process.env.MONGO_CLOUD_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.error(`DB error ${err}`);
  });

app.use("/api/products", productsRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/address", addressRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server at 'http://localhost:${port}`));
