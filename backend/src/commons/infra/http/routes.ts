import { doctorsRouter } from "@modules/doctors/infra/routes/doctorsRoutes";
import { usersRouter } from "@modules/users/infra/routes/usersRoutes";
import { Router } from "express";

export const routes = Router();

routes.use("/users", usersRouter);
routes.use("/doctors", doctorsRouter);
