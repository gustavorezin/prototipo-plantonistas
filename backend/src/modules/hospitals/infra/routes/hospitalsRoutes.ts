import { Router } from "express";
import { HospitalsController } from "../controllers/HospitalsController";
import { isAuthenticated } from "@commons/middlewares/isAuthenticated";

export const hospitalsRouter = Router();
const hospitalsController = new HospitalsController();

hospitalsRouter.use(isAuthenticated);

hospitalsRouter.get("/:id", hospitalsController.show);
hospitalsRouter.get("/", hospitalsController.list);
