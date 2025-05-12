import { Router } from "express";
import { JobsController } from "../controller/JobsController";
import { isAuthenticated } from "@commons/middlewares/isAuthenticated";

export const jobsRouter = Router();
const jobsController = new JobsController();

jobsRouter.use(isAuthenticated);
jobsRouter.post("/", jobsController.create);
jobsRouter.get("/", jobsController.listByHospital);
