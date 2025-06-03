import { Router } from "express";
import { ApplicationController } from "../controller/ApplicationsController";
import { isAuthenticated } from "@commons/middlewares/isAuthenticated";
import { validateData } from "@commons/middlewares/validateData";
import { updateStatusApplicationSchema } from "@modules/applications/domain/models/schemas/UpdateStatusApplicationSchema";

export const applicationsRouter = Router();
const applicationsController = new ApplicationController();

applicationsRouter.use(isAuthenticated);
applicationsRouter.post("/", applicationsController.create);
applicationsRouter.put(
  "/status",
  validateData(updateStatusApplicationSchema),
  applicationsController.updateStatus
);
applicationsRouter.get("/:jobId", applicationsController.listByJob);
applicationsRouter.get("/user/:userType", applicationsController.listByUser);
