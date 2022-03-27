import { NextFunction, Request, Response, Router } from "express";
import { User } from "../Models/Entities/user";

import {
  createUser,
  deleteUser,
  findAll,
  findOneUser,
  sendEmail,
  updateUser,
} from "../Models/Services/UserService";

const userControllerRouter = Router();

userControllerRouter.get("/all", (req: Request, res: Response) => {
  findAll()
    .then((users: Array<User>) => {
      res.send(users);
    })
    .catch((err: Error) => {
      res.status(500).json(err.message);
    });
});
userControllerRouter.get("/:id", (req: Request, res: Response) => {
  findOneUser(req.params.id)
    .then((user: User | null) => {
      if (user) {
        res.json({ user_found: user });
      } else res.status(404).json({ errors: ["User not found"] });
    })
    .catch((err: Error) => res.status(500).json(err.message));
});
userControllerRouter.post("/", (req: Request, res: Response) => {
  createUser(req.body)
    .then((user: any) => {
      res.send({
        message: "** user succesfully created **",
        user,
      });
    })
    .catch((err: Error) => {
      res.status(500).json(err.message);
    });
});
userControllerRouter.patch("/:id", (req: Request, res: Response) => {
  updateUser(req.body, req.params.id)
    .then(() => {
      res.status(202).send({
        message: "** user succesfully updated **",
      });
    })
    .catch((err: Error) => {
      res.status(500).json(err.message);
    });
});
userControllerRouter.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  deleteUser(id)
    .then(() => {
      if (id) res.status(202).json({ message: "user deleted id", id });
      else res.status(404).json({ errors: ["User doesn't exist"] });
    })
    .catch((err: Error) => res.status(500).json(err.message));
});

 
export default userControllerRouter;
