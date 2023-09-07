import { productsDB } from "../models/products.js";
import { validatePartialProduct, validateProduct } from "./validateProduct.js";
import crypto from "node:crypto";

export const productController = {
  getAllProducts: (req, res) => {
    res.send(productsDB);
  },
  getProductsId: (req, res) => {
    const producto = productsDB.find((user) => user.id == req.params.id);
    if (!producto) {
      return res.status(404).json({
        error: "Articulo no encontrado :(",
      });
    }
    return res.json(producto);
  },
  postProduct: (req, res) => {
    const result = validateProduct(req.body);
    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const newProduct = {
      id: crypto.randomUUID(),
      ...result.data,
    };

    productsDB.push(newProduct);
    return res.status(201).json(newProduct);
  },
  updateProduct: (req, res) => {
    const id = req.params.id;
    const result = validatePartialProduct(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const index = productsDB.findIndex((product) => product.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Pelicula no encontrada" });
    }

    const actualizarProducto = {
      ...productsDB[index],
      ...result.data,
    };

    productsDB[index] = actualizarProducto;
    return res.json(actualizarProducto);
  },
  deleteProduct: (req, res) => {
    const index = productsDB.findIndex((nombre) => nombre.id == req.params.id);

    if (index === -1) {
      return res.status(204).send();
    }
  
    productsDB.splice(index, 1);
  
    return res.json({ message: "Producto eliminado con exito" });
  }
};