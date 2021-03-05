import express = require("express");
import multer = require("multer");
import fs = require("fs");
import path = require("path");
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

// if public folder not found then create public folder
const dir = "../public/images";
if (!fs.existsSync(dir)) {
  fs.mkdir(path.join(__dirname, dir), { recursive: true }, (err: any) => {
    if (err) {
      return console.error(err);
    }
  });
}
app.use(express.static("../public"));

// // set up public folder
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
  if (err instanceof multer.MulterError) {
    res.json({
      msg:
        "key name must be productImage, only image file and maximum 4 images can be uploaded ",
    });
  } else {
    res.status(err.status || 500);
    res.send("Error");
  }
});

const port = 4000;

app.listen(port, () => {
  debug(`Backend app listening at http://localhost:${port}`);
});
