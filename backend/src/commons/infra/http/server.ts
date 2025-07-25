import "dotenv/config";
import "reflect-metadata";
import "@commons/container";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "@commons/infra/http/routes";
import { errorHandler } from "@commons/middlewares/errorHandler";

const allowedOrigins = [
  "http://localhost:5173",
  "https://prototipo-plantonistas.vercel.app",
];

const app = express();
app.use(cookieParser());
app.use((req, res, next) => {
  console.log("Cookies recebidos:", req.cookies);
  next();
});
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(5000, () => {
  console.log(`Servidor rodando na porta 5000`);
});
