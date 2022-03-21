import { Router, Request, Response } from "express";
import { test } from "../middlewares/auth";
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

  router.use("/users", userRouter);

  return router;
};

export default configRouters();
