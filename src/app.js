import express from "express";
import "dotenv/config";
import { productRouter } from "./routes/productsRoutes.js";
import cors from "cors";
import fs from "node:fs";

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  fs.readFile("src/views/WelcomePage/index.html", function (error, html) {
    if (error) {
      throw error;
    }
    res.end(html);
  });
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
