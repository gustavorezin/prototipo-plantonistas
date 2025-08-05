import { Router } from "express";
import { JobsController } from "../controller/JobsController";
import { isAuthenticated } from "@commons/middlewares/isAuthenticated";
import { validateData } from "@commons/middlewares/validateData";
import { createJobSchema } from "@modules/jobs/domain/models/schemas/CreateJobSchema";
import { updateJobSchema } from "@modules/jobs/domain/models/schemas/UpdateJobSchema";
import { updateStatusJobSchema } from "@modules/jobs/domain/models/schemas/UpdateStatusJobSchema";

export const jobsRouter = Router();
const jobsController = new JobsController();

jobsRouter.use(isAuthenticated);
jobsRouter.post("/", validateData(createJobSchema), jobsController.create);
jobsRouter.put(
  "/status",
  validateData(updateStatusJobSchema),
  jobsController.updateStatus
);
jobsRouter.put("/:id", validateData(updateJobSchema), jobsController.update);
jobsRouter.get("/hospital", jobsController.listByHospital);
jobsRouter.get("/doctor", jobsController.listByDoctor);
jobsRouter.get("/", jobsController.list);
jobsRouter.get("/:id", jobsController.show);
jobsRouter.delete("/:id", jobsController.delete);
