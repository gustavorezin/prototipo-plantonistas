import { Router } from "express";
import { RequestsController } from "../controllers/RequestsController";
import { isAuthenticated } from "@commons/middlewares/isAuthenticated";

export const requestsRouter = Router();
const requestsController = new RequestsController();

requestsRouter.use(isAuthenticated);

requestsRouter.get("/doctor/:doctorId", requestsController.listByDoctor);
