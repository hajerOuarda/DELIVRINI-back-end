import * as express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PUBLIC_KEY } from "../config/jwt/auth.config";
import { User } from "../Models/Entities/user";
import { verifyOptions } from "../Models/Services/UserService";

const isAuthorized = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      PUBLIC_KEY,
      verifyOptions
    ) as JwtPayload;
    const userId = decodedToken.userId;

    // TODO: req.body doesn't contain user informations
    if (!req.body.userId && req.body.userId !== userId) {
      return res.status(401).send({
        error: { type: "unauthorized", message: "Authentication Failed" },
      });
    } else {
      User.findByPk(userId)
        .then()
        .catch((error) => {
          errore : {}
        });
      next();
    }
  } catch {
    return res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

export { isAuthorized };
