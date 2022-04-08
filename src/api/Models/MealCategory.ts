import Sequelize,{ Model } from "sequelize";
import my_Database from "../../database/database";

export class MealCategory extends Model {
   
  name!: string;
  description!: string;
  image!: string;
   
}

MealCategory.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull:false,
      unique: "mealCategory_name",
    },
    description: {
      type: Sequelize.STRING,
    },
    image:{
      type:Sequelize.STRING
    }
  },
  {
    sequelize: my_Database,
    // tableName: "mealCategory",
  }
);