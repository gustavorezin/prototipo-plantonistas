import { Router } from "express";
import { JobsController } from "../controller/JobsController";
import { isAuthenticated } from "@commons/middlewares/isAuthenticated";
import { validateData } from "@commons/middlewares/validateData";
import { createJobSchema } from "@modules/jobs/domain/models/schemas/CreateJobSchema";

export const jobsRouter = Router();
const jobsController = new JobsController();

jobsRouter.use(isAuthenticated);
jobsRouter.post("/", validateData(createJobSchema), jobsController.create);
jobsRouter.get("/hospital", jobsController.listByHospital);
jobsRouter.get("/", jobsController.list);
