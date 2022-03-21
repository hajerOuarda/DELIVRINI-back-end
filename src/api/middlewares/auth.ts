import * as express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PUBLIC_KEY } from "../config/jwt/auth.config";
import { verifyOptions } from "../Models/Services/UserService";

const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decodedToken = jwt.verify(token, PUBLIC_KEY, const verifyOptions: VerifyOptions = {
) as JwtPayload;
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      res
        .status(401)
        .send({
          error: { type: "unauthorized", message: "Authentication Failed" },
        });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

export function test(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const test = req.body;
  res.json(test);
}

export { auth }