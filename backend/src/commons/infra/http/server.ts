import "reflect-metadata";
import "@commons/container";
import express from "express";
import { routes } from "@commons/infra/http/routes";
import { errorHandler } from "@commons/middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(5000, () => {
  console.log(`Servidor rodando na porta 5000`);
});
