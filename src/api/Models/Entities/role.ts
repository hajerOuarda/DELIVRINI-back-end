import Sequelize, { Model } from "sequelize";
import my_Database from "../../../database/database";
import { User } from "./user";

export class Role extends Model {
  public id!: string;
  public nomRole!: string;
}

Role.init(
  {
    // id: {
    //   type: Sequelize.INTEGER,
    //   primaryKey:true
    // },
    nomRole: {
      type: Sequelize.ENUM("Admin", "client", "Livreur"),
      // type:Sequelize.STRING
    },
  },
  {
    sequelize: my_Database,
    tableName: "roles",
  }
);

