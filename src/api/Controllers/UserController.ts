import { Request, Response, Router } from "express";
import { message } from "../Constants/constants";
import { paginate } from "../middlewares/validators";
import { User } from "../Models/User";

import {
  createUser,
  deleteUser,
  findAllUsers,
  findOneUser,
  updateUser,
} from "../Services/UserService";

const userController = Router();

userController.get("/all", (req: Request, res: Response) => {
  const size: any = req.query.size; // number of records per page, pageSize
  const page: any = req.query.page; // page number
  const options = paginate(page, size);

  findAllUsers(options)
    .then((users: Array<User>) => {
      res.send(users);
    })
    .catch((err: Error) => {
      res.status(404).json(err.message);
    });
});
userController.get("/:id", (req: Request, res: Response) => {
  findOneUser(req.params.id)
    .then((user: User | null) => {
      if (user) {
        res.status(200).json({ user_found: user });
      } else res.status(404).json({ errors: message.user.error.not_found });
    })
    .catch((err: Error) => {
      res.status(404).json(err.message);
    });
});

userController.post("/", (req: Request, res: Response) => {
  createUser(req.body)
    .then((user: any) => {
      res.send({
        message: message.user.success.created,
        user: user,
      });
    })
    .catch((err: Error) => {
      res.status(404).json(err.message);
    });
});
userController.patch("/:id", (req: Request, res: Response) => {
  updateUser(req.body, req.params.id)
    .then((nbrRaw) => {
      if (nbrRaw[0])
        res.status(200).send({
          message: message.user.success.updated,
        });
      else
        res.status(404).send({
          message: message.user.error.not_updated,
        });
    })
    .catch((err: Error) => {
      res.json(err.message);
    });
});
userController.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  deleteUser(id)
    .then((nbrRaw) => {
      if (nbrRaw)
        res.status(200).json({ message: message.user.success.deleted, id });
      else
        res.status(404).json({
          message: message.user.error.not_deleted,
        });
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export default userController;
