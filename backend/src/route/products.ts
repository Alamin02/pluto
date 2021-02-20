import express = require("express");
const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.send("Product list");
});

router.post("/", (req: express.Request, res: express.Response) => {
  res.send("Create product");
});

router.get("/:productId", (req: express.Request, res: express.Response) => {
  res.send("product : " + req.params.productId);
});

router.put("/:productId", (req: express.Request, res: express.Response) => {
  res.send("Update product : " + req.params.productId);
});

export default router;
