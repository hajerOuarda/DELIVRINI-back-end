import express, { Request, Response, Router } from "express"; 
import { UserController } from "../Controllers/UserController";
 
export class UserRouter {
  public userController: UserController  ;
  user_Route: Router ;

  constructor(router: Router) {
    this.user_Route = router;
    this.userController = new UserController(this.user_Route);
  }

  processUserRouting() {
    this.user_Route.get("/users"  ,() => {
      this.userController.controllerRoutes();
    });
   

    return this.user_Route;
  }
}
