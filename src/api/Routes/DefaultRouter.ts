import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { checkIsAdmin, checkIsChef } from "../middlewares/rolesJwt";
import elementRouter from "./ElementRouter";
import ExtrasRouter from "./ExtrasRouter";
import IngredientsRouter from "./IngredientsRouter";
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
  router.use("/restaurants", restaurantRouter);
  router.use(
    "/restaurantCategory",
    restaurantCategoryRouter
  );
  router.use(
    "/mealCategory",

    mealCategoryRouter
  );
  router.use("/meal", [isAuthenticated, checkIsChef], mealRouter);
  router.use("/ingredients", IngredientsRouter);
  router.use("/extras", [isAuthenticated, checkIsChef], ExtrasRouter);
  router.use("/element", [isAuthenticated, checkIsChef], elementRouter);


  return router;
};

export default configRouters();
