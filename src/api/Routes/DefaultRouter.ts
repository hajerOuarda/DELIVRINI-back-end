import { Router, Request, Response } from "express";
import { isAuthorized } from "../middlewares/auth";
import { isAdmin, isClient } from "../middlewares/rolesJwt";
import { login, signup } from "../Models/Services/UserService";
import userRouter from "./UserRouter";

const configRouters = (): Router => {
  const router: Router = Router();
  // midellware
  router.use("/signup", (req: Request, resp: Response, next) => {
    signup(req, resp, next);
  });
  router.use("/login", (req: Request, resp: Response, next) => {
    login(req, resp, next);
  });
  router.use("/", isAuthorized); // HAVE to be under Signup and Signin in order for new user to register before authentication
  router.use("/users", [isAdmin], userRouter);
  return router;
};

export default configRouters();
