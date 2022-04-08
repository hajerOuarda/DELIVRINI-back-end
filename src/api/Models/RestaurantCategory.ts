import Sequelize,{  Model } from "sequelize";
import my_Database from "../../database/database";

export class RestaurantCategory extends Model {
   
  name!: string;
  description!: string;
  image!: string;
   
}

RestaurantCategory.init(
  {
    name: {
      type: Sequelize.STRING,
      unique: "category_name",
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
    // tableName: "restaurantCategory",
  }
);
