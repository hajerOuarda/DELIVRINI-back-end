import { NextFunction, Request, Response, Router } from "express";
import { requireBodyFields } from "../middlewares/validators";
import {
  login,
  requestPasswordReset,
  resetPassword,
  signup,
} from "../Services/UserService";

const authController = Router();

authController.post(
  "/signup",
  [requireBodyFields(["email", "password"])],
  (req: Request, resp: Response) => {
    signup(req, resp);
  }
);
authController.post(
  "/login",
  [requireBodyFields(["email", "password"])],
  (req: Request, resp: Response) => {
    login(req, resp);
  }
);
authController.post(
  "/requestPasswordReset",
  [requireBodyFields(["email"])],
  (req: Request, res: Response) => {
    requestPasswordReset(req, res);
  }
);

authController.post(
  "/resetPassword",
  [requireBodyFields(["password"])],
  (req: Request, res: Response) => {
    resetPassword(req, res);
  }
);

export default authController;
