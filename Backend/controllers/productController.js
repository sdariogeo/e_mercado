// Importamos los models necesarios
const productsModel = require("../models/productModel");

const getProducts = async (req, res) => {
  const product = await productsModel.getProducts();
  res.json(product);
};

const getProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await productsModel.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
};

const createProduct = async (req, res) => {
  const createdProduct = await productsModel.createProduct(req.body);
  if (createdProduct) {
    res.json(createdProduct);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }
};

const updateProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await productsModel.getProductById(id);
  if (product) {
    const updatedProduct = await productsModel.updateProduct(parseInt(req.params.id), {
      ...product,
      ...req.body,
    });

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
};

const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await productsModel.getProductById(id);
  if (product) {
    const result = await productsModel.deleteProduct(parseInt(req.params.id));

    if (result) {
      res.json(product);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
