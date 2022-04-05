import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { checkIsAdmin } from "../middlewares/rolesJwt";
import elementRouter from "./ElementRouter";
import mealCategoryRouter from "./MealCategoryRouter";
import mealRouter from "./MealRouter";

import restaurantCategoryRouter from "./RestaurantCategoryRouter";
import restaurantRouter from "./RestaurantRouter";
import userRouter from "./UserRouter";

const configRouters = (): Router => {
  const router: Router = Router();
  // midellware

  router.use("/user", userRouter);
  router.use("/restaurants", [isAuthenticated, checkIsAdmin], restaurantRouter);
  router.use(
    "/restaurantCategory",
    [isAuthenticated, checkIsAdmin],
    restaurantCategoryRouter
  );
  router.use(
    "/mealCategory",
    [isAuthenticated, checkIsAdmin],
    mealCategoryRouter
  );
  router.use("/meal", [isAuthenticated, checkIsAdmin], mealRouter);
  router.use("/element", [isAuthenticated, checkIsAdmin],elementRouter );

  return router;
};

export default configRouters();
