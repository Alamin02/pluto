import express = require("express");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import { createConnection } from "typeorm";
const debug = require("debug")("app");

import cors from "cors";

import {
  userRouter,
  productRouter,
  blogRouter,
  offerRouter,
  orderRouter,
  addressRouter,
  categoryRouter,
  productImageRouter,
} from "./route";

import {
  User,
  Product,
  Blog,
  ProductImage,
  Offer,
  Order,
  OrderedProduct,
  Category,
  Address,
} from "./entity";

const app = express();

// // set up public folder
app.use(express.static("./public"));
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/offers", offerRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/addresses", addressRouter);
app.use("/api/v1/productImages", productImageRouter);

createConnection({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [
    User,
    Product,
    Blog,
    ProductImage,
    Offer,
    Category,
    Order,
    OrderedProduct,
    Address,
  ],
  synchronize: true,
});

app.use(function (
  err: any,
  req: express.Request,
  res: express.Response,
  next: Function
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.send("Error");
});

// set up public folder
app.use(express.static("./public"));

const port = 4000;

app.listen(port, () => {
  debug(`Backend app listening at http://localhost:${port}`);
});
