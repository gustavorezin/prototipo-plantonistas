import { Router } from "express";
import { SpecialtiesController } from "../controllers/SpecialtiesController";

export const specialtiesRouter = Router();
const specialtiesController = new SpecialtiesController();

specialtiesRouter.get("/", specialtiesController.list);
specialtiesRouter.get("/doctor/:doctorId", specialtiesController.listByDoctor);
