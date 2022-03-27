// import { Role } from "../Models/Entities/role";
// import { User } from "../Models/Entities/user";

import { NextFunction, Request, Response } from "express";
import { User } from "../Models/Entities/user";

const checkIsClient = (req: Request, res: Response, next: NextFunction) => {
  const userId = (<any>req).userId;
  User.findByPk(userId)
    .then((user) => {
      if (user?.getDataValue("fk_role") === "client") {
        const role = user?.getDataValue("fk_role");
        res.status(200).json({
          access_granted: "you are ".concat(user?.getDataValue("fk_role")),
        });
        next();
      }
    })
    .catch((error) => {
      res.status(403).send({
        error: error.mesage,
        message: "you're not client , this Require Client Role!",
      });
    });
};

const checkIsAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userId = (<any>req).userId;
  console.log(userId);

  User.findByPk(userId)
    .then((user) => {
      if (user?.getDataValue("fk_role") === "admin") {
        // const role = user?.getDataValue("fk_role");
        // res.status(200).json({
        //   access_granted: "you are ".concat(role),
        // })
        return next();
      } else {
        res.status(403).send({
          error: "you're not Admin , this Require Admin Role!",
        });
      }
    })
    .catch((error) => {
      res.status(403).send({
        error: error.mesage,
        message: "you're not Admin , this Requires Admin Role!",
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
        return next();
      } else {
        res.status(403).send({
          error: "you're not Chef , this Requires Chef Role!",
        });
        return next();
      }
    })
    .catch((error) => {
      res.status(403).send({
        error: error.mesage,
        message: "you're not Admin , this Requires Chef Role!",
      });
    });
};

export { checkIsClient, checkIsChef, checkIsAdmin };
