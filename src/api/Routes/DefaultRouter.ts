import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { checkIsAdmin, checkIsChef } from "../middlewares/rolesJwt";
import elementRouter from "./ElementRouter";
import mealCategoryRouter from "./MealCategoryRouter";
import mealRouter from "./MealRouter";

import restaurantCategoryRouter from "./RestaurantCategoryRouter";
import restaurantRouter from "./RestaurantRouter";
import userRouter from "./UserRouter";

const configRouters = (): Router => {
  const router: Router = Router();
  // midellware
  router.get("/hello", (req: Request, res: Response) => {
    res.send({ message: "test done" })
  })

  router.use("/user", userRouter);
  router.use("/restaurants",  restaurantRouter);
  router.use(
    "/restaurantCategory",
    [isAuthenticated, checkIsAdmin],
    restaurantCategoryRouter
  );
  router.use(
    "/mealCategory",
    [isAuthenticated],
    mealCategoryRouter
  );
  router.use("/meal", [isAuthenticated, checkIsChef], mealRouter);
  router.use("/element", [isAuthenticated, checkIsChef], elementRouter);


  return router;
};

export default configRouters();
