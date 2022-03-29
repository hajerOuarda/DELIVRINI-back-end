import { Router } from "express";
import restaurantControllerRouter from "../Controllers/RestaurantController";

const restaurantRouter = (): Router => {
  const router: Router = Router();
  router.use("/", restaurantControllerRouter);

  return router;
};

export default restaurantRouter();
