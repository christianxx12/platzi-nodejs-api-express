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
  const newProduct = ProductService.create(body);
  res.status(201).json(newProduct);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = ProductService.update(id, body);
  res.json(product);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const respuesta = ProductService.delete(id);
  res.json(respuesta);
});

export default router;
