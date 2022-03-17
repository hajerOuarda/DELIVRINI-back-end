import { request, Request, response, Response, Router } from "express";
import { User } from "../Models/Entities/user";

import { UserService } from "../Models/Services/UserService";

export class UserController {
  userControllerRouter: Router;
  userService: UserService;

  constructor(router: Router) {
    this.userControllerRouter = router;
    this.userService = new UserService();
    this.controllerRoutes();
  }

  public controllerRoutes() {
     
    this.userControllerRouter.get("/all", (req, res) => {
      this.showall(req, res);
    });
    this.userControllerRouter.get("/:id", (req, res) => {
      this.showOne(req, res);
    });
    this.userControllerRouter.post("/", (req, res) => {
      this.create(req, res);
    });
    this.userControllerRouter.patch("/:id", (req, res) =>
      this.update(req, res)
    );
    this.userControllerRouter.delete("/:id", (req, res) =>
      this.delete(req, res)
    );
  }

 

  async showall(req: Request, res: Response) {
    await this.userService
      .findAll()
      .then((users: Array<User>) => {
        res.send(users);
      })
      .catch((err: Error) => res.status(500).json(err.message));
  }
  async showOne(req: Request, res: Response) {
    await this.userService
      .findOne(req.params.id)
      .then((user: User | null) => {
        if (user) {
          res.json({ user_found: user });
        } else res.status(404).json({ errors: ["User not found"] });
      })
      .catch((err: Error) => res.status(500).json(err.message));
  }
  async create(req: Request, res: Response) {
    return await this.userService
      .create(req.body)
      .then((user: User) => {
        res.send(user);
        console.log("*** user created succesfully ***");
      })
      .catch((err: Error) => res.json(err.message));
  }

  async update(req: Request, res: Response) {
    return await this.userService
      .update(req.body, req.params.id)
      .then(() => res.status(202).json({ update: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
  async delete(req: Request, res: Response) {
    const userId = req.params.id;
    return await this.userService
      .delete(userId)
      .then((id) => {
        if (id) res.status(202).json({ message: "user deleted id", id });
        else res.status(404).json({ errors: ["User doesn't exist"] });
      })
      .catch((err: Error) => res.status(500).json(err.message));
  }
}
