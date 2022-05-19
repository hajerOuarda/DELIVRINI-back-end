import { Router } from "express";
import authController from "../Controllers/AuthController";
import userController from "../Controllers/UserController";
import { isAuthenticated } from "../middlewares/auth";
import { checkIsAdmin } from "../middlewares/rolesJwt";

const config = (): Router => {
  const router: Router = Router();
  //  
  router.use("/admin",
    [isAuthenticated, checkIsAdmin],
    userController)

  router.use('/auth', authController)
  return router;
};

export default config();
