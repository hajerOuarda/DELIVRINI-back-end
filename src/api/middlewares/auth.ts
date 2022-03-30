import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PUBLIC_KEY } from "../config/jwt/auth.config";
import { User } from "../Models/user";
import { verifyOptions } from "../Services/UserService";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      PUBLIC_KEY,
      verifyOptions
    ) as JwtPayload;
    const userId = decodedToken.userId;

    User.findByPk(userId)
      .then(() => {
        (<any>req).userId = userId;
        next();
      })
      .catch((error) => {
        res.status(401).json({
          error: { type: "unauthorized", message: "Authentication Failed" },
        });
      });
  } catch (error:any) {
    return res.status(500).json({
      message: "Invalid Token! ",
      error:error.message
      
    });
  }
};

export { isAuthenticated };
