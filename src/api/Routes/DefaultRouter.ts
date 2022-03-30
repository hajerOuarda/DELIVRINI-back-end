import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { checkIsAdmin } from "../middlewares/rolesJwt";
 import restaurantRouter from "./RestaurantRouter";
import userRouter from "./UserRouter";

const configRouters = (): Router => {
  const router: Router = Router();
  // midellware

  router.use("/user", userRouter);
  router.use("/restaurants",[isAuthenticated,checkIsAdmin], restaurantRouter);
  return router;
};

export default configRouters();
