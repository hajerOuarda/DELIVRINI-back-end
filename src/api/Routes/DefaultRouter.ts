import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { checkIsAdmin } from "../middlewares/rolesJwt";
<<<<<<< Updated upstream
import { login, requestPasswordReset, sendEmail, signup } from "../Models/Services/UserService";
=======
import RestaurantCategoryRouter from "./RestaurantCategoryRouter";
import restaurantRouter from "./RestaurantRouter";
>>>>>>> Stashed changes
import userRouter from "./UserRouter";

const configRouters = (): Router => {
  const router: Router = Router();
  // midellware
  

<<<<<<< Updated upstream
  router.use("/user",  userRouter);
  // router.use('/restaurants',restoRouter)
=======
  router.use("/user", userRouter);
  router.use("/restaurants", [isAuthenticated, checkIsAdmin], restaurantRouter);
  router.use("/restaurantCategory", RestaurantCategoryRouter);

>>>>>>> Stashed changes
  return router;
};

export default configRouters();
