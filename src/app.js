import express from "express";
import cors from "cors";
import "dotenv/config"
import { productRouter } from "./routes/productsRoutes.js";

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    const ORIGENES_ACEPTADOS = [
      "http://localhost:8080",
      "http://localhost:3000",
    ];

    if (ORIGENES_ACEPTADOS.includes(origin)) {
      return callback(null, true);
    }

    if (!origin) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
})
);

app.get("/",(req,res) => {
  res.send("Bienvenido a TecnoShop, tu tienda de tecnologia de confianza");
})

app.use("/products", productRouter)

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

const port = process.env.PORT ?? 5000;
app.listen(port, () => {
  console.log(`Servidor escuchando en: http://localhost:${port}`)
})