import Sequelize, { Model } from "sequelize";
import my_Database from "../../../database/database";
 
export class Role extends Model {
    id!: string;
    roleName!: string;
}

Role.init(
  {
    roleName: {
      type: Sequelize.ENUM("admin", "client","chef","deliveryMan"),
      unique: "roleName",
      // defaultValue: "admin",
    },
    
  },

  {
    sequelize: my_Database,
    // tableName: "roles",
  }
);
 