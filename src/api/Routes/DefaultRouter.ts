import { Router, Request, Response, NextFunction } from "express";
 

import userRouter from "./UserRouter";

const configRouters = (): Router => {
  const router: Router = Router();
  // midellware

  router.use("/user", userRouter);

  return router;
};

export default configRouters();
