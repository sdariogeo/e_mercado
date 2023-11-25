const express = require("express");
const productsRouter = express.Router();
// Importamos los controllers necesarios
const productsController = require("../controllers/productController");

productsRouter.get("/", productsController.getProducts);

productsRouter.get("/:id", productsController.getProductById);

productsRouter.post("/", productsController.createProduct);

productsRouter.put("/:id", productsController.updateProduct);

productsRouter.delete("/:id", productsController.deleteProduct);

module.exports = productsRouter;
