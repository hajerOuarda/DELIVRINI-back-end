// import { Role } from "../Models/Entities/role";
// import { User } from "../Models/Entities/user";

import { NextFunction, Request, Response } from "express";
import { User } from "../Models/user";

const checkIsClient = (req: Request, res: Response, next: NextFunction) => {
  const userId = (<any>req).userId;
  User.findByPk(userId)
    .then((user) => {
      if (user?.getDataValue("fk_role") === "client") {
        const role = user?.getDataValue("fk_role");
        res.status(200).json({
          access_granted: "you are ".concat(user?.getDataValue("fk_role")),
        });
      } else {
        res.status(403).send({
          error: "you're not Client , this Require Client Role!",
        });
      }
      next();
    })
    .catch((error) => {
      res.status(404).send({
        error: error.mesage,
      });
    });
};

const checkIsAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userId = (<any>req).userId;
 
  User.findByPk(userId)
    .then((user) => {
      if (user?.getDataValue("fk_role") === "admin") {
      } else {
        res.status(403).send({
          error: "you're not Admin , this Require Admin Role!",
        });
      }
      next();
    })
    .catch((error) => {
      res.status(404).send({
        error: error.mesage,
      });
    });
};

const checkIsChef = (req: Request, res: Response, next: NextFunction) => {
  const userId = (<any>req).userId;
  User.findByPk(userId)
    .then((user) => {
      if (user?.getDataValue("fk_role") === "chef") {
        const role = user?.getDataValue("fk_role");
        res.status(200).json({
          access_granted: "you are ".concat(user?.getDataValue("fk_role")),
        });
      } else {
        res.status(403).send({
          error: "you're not Chef , this Requires Chef Role!",
        });
      }
      return next();
    })
    .catch((error) => {
      res.status(404).send({
        error: error.mesage,
      });
    });
};

export { checkIsClient, checkIsChef, checkIsAdmin };
