import { Router } from "express";
import extrasController from "../Controllers/ExtrasController";


const extrasRouter = (): Router => {
    const router: Router = Router();
    router.use("/", extrasController);
    return router;
};

export default extrasRouter();