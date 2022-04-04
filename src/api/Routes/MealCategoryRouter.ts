import { Router } from "express";
import mealCategoryController from "../Controllers/MealCategoryController";
 
const mealCategoryRouter = (): Router => {
  const router: Router = Router();
  router.use("/", mealCategoryController);
  return router;
};

export default mealCategoryRouter();
