import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { checkIsAdmin } from "../middlewares/rolesJwt";
import { login, requestPasswordReset, sendEmail, signup } from "../Models/Services/UserService";
import userRouter from "./UserRouter";

const configRouters = (): Router => {
  const router: Router = Router();
  // midellware
  

  router.use("/user",  userRouter);
  // router.use('/restaurants',restoRouter)
  return router;
};

export default configRouters();
