import { NextFunction, Request, Response, Router } from "express";
import {
  login,
  requestPasswordReset,
  resetPassword,
  signup,
} from "../Models/Services/UserService";

const authControllerRouter = Router();

authControllerRouter.get("/signup", (req: Request, resp: Response, next) => {
  signup(req, resp, next);
});
authControllerRouter.get("/login", (req: Request, resp: Response, next) => {
  login(req, resp, next);
});
authControllerRouter.get(
  "/requestPasswordReset",
  (req: Request, res: Response, next: NextFunction) => {
    requestPasswordReset(req,res,next)
      
  }
);

authControllerRouter.get(
  "/resetPassword",
  (req: Request, res: Response, next: NextFunction) => {
    resetPassword(req,res,next)
     
  }
);

export default authControllerRouter;
