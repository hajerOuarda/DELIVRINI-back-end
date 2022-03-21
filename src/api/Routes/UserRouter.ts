import { Router } from "express";
import UserController from "../Controllers/UserController";
import { auth } from "../middlewares/auth";
import { signup } from "../Models/Services/UserService";
  
const config = (): Router => {
  const route: Router = Router();
    route.use("/",UserController);

  return route;
};

export default config();
