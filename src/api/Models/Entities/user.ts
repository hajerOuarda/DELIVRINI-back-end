import Sequelize, { Model } from "sequelize";
import my_Database from "../../../database/database";
import * as bcrypt from "bcrypt";
import { Role } from "./role";

export class User extends Model {
  id!: number;
  nom!: string;
  prenom!: string;
  login!: string;
  motDePass!: string;
  email!: string;
  telephone!: string;
  role!: string;
}

User.init(
  { 
    nom: {
      type: Sequelize.STRING,
    },
    prenom: {
      type: Sequelize.STRING,
    },
    login: {
      type: Sequelize.STRING,
    },
    motDePass: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telephone: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: my_Database,
    tableName: "user",
  }
);

User.belongsTo(Role, { as: "role" });
