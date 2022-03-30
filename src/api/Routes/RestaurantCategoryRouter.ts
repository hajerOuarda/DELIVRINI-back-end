import { Router } from "express";
import restaurantCategoryControllerRouter from "../Controllers/RestaurantCategoryController";

const restaurantCategoryRouter = (): Router => {
  const router: Router = Router();
  router.use("/", restaurantCategoryControllerRouter);
  return router;
};

export default restaurantCategoryRouter();
