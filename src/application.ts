import express, { Router, Express } from "express";
import dbInit from "./database/init";
import bodyParser from "body-parser";
import { PORT } from "./api/Constants/constants";
import { DefaultRouter } from "./api/Routes/DefaultRouter";
 
export class Application {
  public app: Express;
  public defaultRouter: DefaultRouter;
  public mainRouter!: Router;
  constructor() {
    this.app = express();
    this.mainRouter = express.Router();
    this.defaultRouter = new DefaultRouter(this.mainRouter);
    this.config();
    dbInit();
    // this.app.use(tokenGuard())
     this.run();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  run() {
    try {
      this.app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}/apiDelivrini`);
      });
    } catch (error: any) {
      console.log(`Error occurred: ${error.message}`);
    }
    
      this.app.use(
        "/apiDelivrini",
        this.defaultRouter.processDefaultRouting()
      );

  }
}

export default new Application();
