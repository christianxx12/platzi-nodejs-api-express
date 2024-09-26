import express from "express";
import ProductService from "../services/product.service.js";
import { validatorHandler } from "../middlewares/validator.handler.js";
import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await ProductService.find();
  res.json(products);
});

router.get("/filter", (req, res) => {
  res.send("Yo soy un filter");
});

router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await ProductService.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newProduct = await ProductService.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await ProductService.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const respuesta = await ProductService.delete(id);
  res.json(respuesta);
});

export default router;
