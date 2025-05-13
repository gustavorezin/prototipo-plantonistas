import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { isAuthenticated } from "@commons/middlewares/isAuthenticated";
import { validateData } from "@commons/middlewares/validateData";
import { createUserSchema } from "@modules/users/domain/models/schemas/CreateUserSchema";
import { loginUserSchema } from "@modules/users/domain/models/schemas/LoginUserSchema";
import { updateUserSchema } from "@modules/users/domain/models/schemas/UpdateUserSchema";

export const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/", validateData(createUserSchema), usersController.create);
usersRouter.post(
  "/login",
  validateData(loginUserSchema),
  usersController.login
);
usersRouter.post("/logout", usersController.logout);

usersRouter.use(isAuthenticated);
usersRouter.get("/session", usersController.session);
usersRouter.get("/profile", usersController.show);
usersRouter.put("/", validateData(updateUserSchema), usersController.update);
usersRouter.put("/password", usersController.updatePassword);
