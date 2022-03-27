import { Router } from "express";
import authControllerRouter from "../Controllers/AuthController";
import UserController from "../Controllers/UserController";
import { isAuthenticated } from "../middlewares/auth";
import { checkIsAdmin } from "../middlewares/rolesJwt";

const config = (): Router => {
  const route: Router = Router();

  route.use("/admin",[isAuthenticated, checkIsAdmin], UserController); 
  route.use('/auth',authControllerRouter)
  return route;
};

export default config();
