import { Router } from "express";
import { DoctorsController } from "../controllers/DoctorsController";
import { isAuthenticated } from "@commons/middlewares/isAuthenticated";

export const doctorsRouter = Router();
const doctorsController = new DoctorsController();

doctorsRouter.use(isAuthenticated);

doctorsRouter.get("/:id", doctorsController.show);
doctorsRouter.get("/", doctorsController.list);
