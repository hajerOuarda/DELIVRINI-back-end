import { Router } from "express";
import mealController from "../Controllers/MealController";
 
const mealRouter = (): Router => {
  const router: Router = Router();
  router.use("/", mealController);
  return router;
};

export default mealRouter();
