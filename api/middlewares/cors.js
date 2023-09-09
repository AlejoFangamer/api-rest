import cors from "cors";
import "dotenv/config";

const apiOptions = {
  origin: (origin, callback) => {
    const ORIGENES_ACEPTADOS = [
      "http://localhost:8080",
      "http://localhost:3001",
    ];
    if (ORIGENES_ACEPTADOS.includes(origin)) {
      return callback(null, true);
    }
    if (!origin) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  }
}

export const apiCors = cors(apiOptions);