import { NextFunction, Request, Response, Router } from "express";
import {
  login,
  requestPasswordReset,
  resetPassword,
  signup,
} from "../Services/UserService";

const authControllerRouter = Router();

authControllerRouter.get(
  "/signup",
  (req: Request, resp: Response, next: NextFunction) => {
    signup(req, resp, next);
  }
);
authControllerRouter.get(
  "/login",
  (req: Request, resp: Response, next: NextFunction) => {
    login(req, resp, next);
  }
);
authControllerRouter.get(
  "/requestPasswordReset",
  (req: Request, res: Response) => {
    requestPasswordReset(req, res);
  }
);

authControllerRouter.get("/resetPassword", (req: Request, res: Response) => {
  resetPassword(req, res);
});

export default authControllerRouter;
