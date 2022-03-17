import express, { Request, Response, Router } from "express";
import { ClientRouter } from "./ClientRouter";
import { UserRouter } from "./UserRouter";

export class DefaultRouter {
  default_router: Router;
  userRouter: UserRouter;
  // clientRouter: ClientRouter;
  constructor(router: Router) {
    this.default_router = router;
    this.userRouter = new UserRouter(this.default_router);
    // this.clientRouter = new ClientRouter(this.default_router);
  }

  processDefaultRouting() {
    this.default_router
      .use("/users", this.userRouter.processUserRouting())
      // .use("/clients", this.clientRouter.processClientRouting());

    return this.default_router;
  }
}
