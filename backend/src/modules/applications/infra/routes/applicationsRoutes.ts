import { Router } from "express";
import { ApplicationController } from "../controller/ApplicationsController";
import { isAuthenticated } from "@commons/middlewares/isAuthenticated";

export const applicationsRouter = Router();
const applicationsController = new ApplicationController();

applicationsRouter.use(isAuthenticated);
applicationsRouter.post("/", applicationsController.create);
applicationsRouter.put("/status", applicationsController.updateStatus);
applicationsRouter.get("/:jobId", applicationsController.listByJob);
