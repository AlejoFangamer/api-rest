import express from "express";
import "dotenv/config";
import { productRouter } from "./api/routes/productsRoutes.js";
import { apiCors } from "./api/middlewares/cors.js";

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(apiCors);

app.get("/", (req, res) => {
  res.send("Bienvenido a TecnoShop, tu tienda de tecnologia de confianza");
});

app.use("/products", productRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

const port = process.env.PORT ?? 5000;

app.listen(port, () => {
  console.log(`Servidor escuchando en: http://localhost:${port}`);
});
