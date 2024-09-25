import express from "express";
import ProductService from "../services/product.service.js";

const router = express.Router();

router.get("/", (req, res) => {
  const products = ProductService.find();
  res.json(products);
});

router.get("/filter", (req, res) => {
  res.send("Yo soy un filter");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = ProductService.findOne(id);
  res.json(product);
});

router.post("/", (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: "created",
    data: body,
  });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "update",
    data: body,
    id,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    message: "deleted",
    id,
  });
});

export default router;
