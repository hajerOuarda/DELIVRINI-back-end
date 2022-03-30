import { Router } from "express";
import authControllerRouter from "../Controllers/AuthController";
import userControllerRouter from "../Controllers/UserController";
 import { isAuthenticated } from "../middlewares/auth";
import { checkIsAdmin } from "../middlewares/rolesJwt";

const config = (): Router => {
  const router: Router = Router();
//  
  router.use("/admin",[isAuthenticated,checkIsAdmin], userControllerRouter) 
  
  router.use('/auth',authControllerRouter)
  return router;
};

export default config();
