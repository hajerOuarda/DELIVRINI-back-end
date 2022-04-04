import { Router } from "express";
import restaurantController from "../Controllers/RestaurantController";

const restaurantRouter = (): Router => {
  const router: Router = Router();
  router.use("/", restaurantController);

  return router;
};

export default restaurantRouter();
