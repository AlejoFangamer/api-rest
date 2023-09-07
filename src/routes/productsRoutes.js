import { Router } from "express";
import { productController } from "../controllers/productController.js";

export const productRouter = Router();

productRouter.get('/',productController.getAllProducts);
productRouter.get('/:id',productController.getProductsId);
productRouter.post('/',productController.postProduct);
productRouter.patch('/:id',productController.updateProduct);
productRouter.delete('/:id',productController.deleteProduct);