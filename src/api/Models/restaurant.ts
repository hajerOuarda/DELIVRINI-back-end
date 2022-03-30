import Sequelize, {  Model } from "sequelize";
import my_Database from "../../database/database";
import { RestaurantCategory } from "./restaurantCategory";

export class Restaurant extends Model {
  id!: number;
  name!: string;
  email!:string
  address!: string;
  zipCode!:string;
  street!:string
}

Restaurant.init(
  {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: "email",
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
  },
  {
    sequelize: my_Database,
    // tableName: "restaurant",
  }
);

