// import { Role } from "../Models/Entities/role";
// import { User } from "../Models/Entities/user";

import { NextFunction, Request, Response } from "express";
import { message } from "../Constants/constants";
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
        message: message.role.client.access_not_granted,
      });
    });
};

const checkIsAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userId = (<any>req).userId;
  console.log(userId);

  User.findByPk(userId)
    .then((user) => {
      if (user?.getDataValue("fk_role") === "admin") {
        
        return next();
      } else {
        res.status(403).send({
          error: message.role.admin.access_not_granted,
        });
      }
    })
    .catch((error) => {
      res.status(403).send({
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
        return next();
      } else {
        res.status(403).send({
          error: message.role.chef.access_not_granted,
        });
        return next();
      }
    })
    .catch((error) => {
      res.status(403).send({
        error: error.mesage,
        
      });
    });
};

const checkIsDeliveryMan = (req: Request, res: Response, next: NextFunction) => {
  const userId = (<any>req).userId;
  User.findByPk(userId)
    .then((user) => {
      if (user?.getDataValue("fk_role") === "deliveryMan") {
        const role = user?.getDataValue("fk_role");
        res.status(200).json({
          access_granted: "you are ".concat(user?.getDataValue("fk_role")),
        });
        return next();
      } else {
        res.status(403).send({
          error: message.role.chef.access_not_granted,
        });
        return next();
      }
    })
    .catch((error) => {
      res.status(403).send({
        error: error.mesage,
      });
    });
};


export { checkIsClient, checkIsChef, checkIsAdmin, checkIsDeliveryMan };
