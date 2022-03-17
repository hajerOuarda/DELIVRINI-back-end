import Sequelize, { Model } from "sequelize";
import my_Database from "../../../database/database";
import * as bcrypt from "bcrypt";
import { Role } from "./role";


export class User extends Model {
  id!: number;
  public nom!: string;
  public prenom!: string;
  public login!: string;
  public motDepass!: string;
  public email!: string;
  public telephone!: string;
  public role!: string;
   
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
    role: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: my_Database,
    tableName: "user",
  }
);

 
User.belongsToMany(Role, { through: "user_roles" });