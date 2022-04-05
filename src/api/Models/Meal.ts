import Sequelize, { Model } from "sequelize";
import my_Database from "../../database/database";
  

export class Meal extends Model {
  name!: string;
  description!: string;
  image!: string;
}

Meal.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull:false,
      unique: "meal_name",
    },
    description: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: my_Database,
    // tableName: "meal",
  }
);
 
