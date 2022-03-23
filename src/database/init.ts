import { Role } from "../api/Models/Entities/role";
import { User } from "../api/Models/Entities/user";
import my_Database from "./database";

const isDev = process.env.NODE_ENV === "development";

const dbInit = () => {
  my_Database
    .authenticate()
    .then(() => {
      console.info("INFO - Database connected.");
    })
    .catch((err: Error) => {
      console.error(
        " !! ERROR - Unable to connect to the database (maybe open xampp ?)!! :",
        err.message
      );
    });

  my_Database
    .sync({ alter: true })
    .then(() => {
      console.info("INFO - Database has been synced");
    })
    .catch((err: Error) => {
      console.error(" !! ERROR - Unable to sync database!! :", err.message);
    });

  // Promise.all([Role.sync({ alter: true }), User.sync({ alter: true })])
  //   .then(() => {
  //     console.info("INFO - Database has been synced");
  //   })
  //   .catch((err: Error) => {
  //     console.error(" !! ERROR - Unable to sync database!! :", err.message);
  //   });
};

export default dbInit;
