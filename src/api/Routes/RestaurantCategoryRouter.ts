import { Router } from "express";
import restaurantCategoryController from "../Controllers/RestaurantCategoryController";

const restaurantCategoryRouter = (): Router => {
  const router: Router = Router();
  router.use("/", restaurantCategoryController);
  return router;
};

export default restaurantCategoryRouter();
