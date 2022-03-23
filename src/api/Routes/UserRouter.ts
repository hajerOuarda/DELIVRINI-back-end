import { Router } from "express";
import UserController from "../Controllers/UserController";

const config = (): Router => {
  const route: Router = Router();
  route.use("/", UserController);

  return route;
};

export default config();
