import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { isAuthenticated } from "@commons/middlewares/isAuthenticated";
import { validateData } from "@commons/middlewares/validateData";
import { createUserSchema } from "@modules/users/domain/schemas/usersSchemas";

export const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/", validateData(createUserSchema), usersController.create);
usersRouter.post("/login", usersController.login);
usersRouter.post("/logout", usersController.logout);

usersRouter.use(isAuthenticated);
usersRouter.get("/session", usersController.session);
usersRouter.get("/profile", usersController.show);
usersRouter.put("/", usersController.update);
usersRouter.put("/password", usersController.updatePassword);
