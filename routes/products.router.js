import express from "express";
import ProductService from "../services/product.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await ProductService.find();
  res.json(products);
});

router.get("/filter", (req, res) => {
  res.send("Yo soy un filter");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.findOne(id);
  res.json(product);
});

router.post("/", async (req, res) => {
  const body = req.body;
  const newProduct = await ProductService.create(body);
  res.status(201).json(newProduct);
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await ProductService.update(id, body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const respuesta = await ProductService.delete(id);
  res.json(respuesta);
});

export default router;
