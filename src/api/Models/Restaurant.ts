import Sequelize, { Model } from "sequelize";
import my_Database from "../../database/database";

export class Restaurant extends Model {

  name!: string;
  email!: string
  address!: string;
  zipCode!: string;
  street!: string;
  phone!: string;
  image!:string
}

Restaurant.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: "name",
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
    phone: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: my_Database,
    // tableName: "restaurant",
  }
);

