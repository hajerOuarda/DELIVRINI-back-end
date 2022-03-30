import Sequelize, { Model } from "sequelize";
import my_Database from "../../../database/database";

export class Token extends Model {
  userId!: string;
  token!: string;
 }

Token.init(
  {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // tokenExpires: {
    //   type: Sequelize.DATE,
    //   defaultValue: Sequelize.NOW(),
    // },
  },

  {
    timestamps: true,
    sequelize: my_Database,
    // tableName: "Token",
  }
);
