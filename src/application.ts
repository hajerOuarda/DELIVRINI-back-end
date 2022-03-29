import express, { Express } from "express";
import dbInit from "./database/init";
import bodyParser from "body-parser";
import { PORT } from "./api/Constants/constants";
import defaultRouter from "./api/Routes/DefaultRouter";
import { User } from "./api/Models/user";
import { userInfo } from "os";

export class Application {
  public app: Express;
  constructor() {
    this.app = express();
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

    this.app.use("/apiDelivrini", defaultRouter);
  }
}

export default new Application();
