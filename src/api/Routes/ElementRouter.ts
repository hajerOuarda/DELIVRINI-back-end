import { Router } from "express";
import elementController from "../Controllers/ElementController";


const elementRouter = (): Router => {
  const router: Router = Router();
  router.use("/", elementController);
  return router;
};

export default elementRouter();