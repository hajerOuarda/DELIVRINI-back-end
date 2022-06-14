import { Router } from "express";
import ingredientsController from "../Controllers/IngredientsController";
 

const ingrendientsRouter = (): Router => {
    const router: Router = Router();
    router.use("/", ingredientsController);
    return router;
};

export default ingrendientsRouter();