import express from "express";
import {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} from "../controller/Product.js";

const router = express.Router();
//  /products is already added in base path
router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct);

export default router;
