import { doctorsRouter } from "@modules/doctors/infra/routes/doctorsRoutes";
import { hospitalsRouter } from "@modules/hospitals/infra/routes/hospitalsRoutes";
import { requestsRouter } from "@modules/requests/infra/routes/requestsRoutes";
import { specialtiesRouter } from "@modules/specialties/infra/routes/specialtiesRoutes";
import { usersRouter } from "@modules/users/infra/routes/usersRoutes";
import { Router } from "express";

export const routes = Router();

routes.use("/users", usersRouter);
routes.use("/doctors", doctorsRouter);
routes.use("/hospitals", hospitalsRouter);
routes.use("/requests", requestsRouter);
routes.use("/specialties", specialtiesRouter);
