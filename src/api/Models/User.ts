import Sequelize, { Model } from "sequelize";
import my_Database from "../../database/database";
import { Role } from "./Role";
import { Token } from "./Token";

export class User extends Model {
  id!: number;
  name!: string;
  lastname!: string;
  password!: string;
  email!: string;
  phone!: string;
  role?: string;
  address!: string;
  zipCode!: string;
  street!: string;
  statusDM!: string;
}

User.init(
  {
    name: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: "email",
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    zipCode: {
      type: Sequelize.STRING,
    },
    street: {
      type: Sequelize.STRING,
    },
    statusDM: {
      // delivery man status
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: my_Database,
    // tableName: "user",
  }
);

User.belongsTo(Role, {
  foreignKey: "fk_role",
  onDelete: "SET NULL",
  targetKey: "roleName",
});

User.hasOne(Token, { foreignKey: "userId" });
