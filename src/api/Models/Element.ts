import Sequelize, { Model } from "sequelize";
import my_Database from "../../database/database";


//Element or Item 
export class Element extends Model {
  name!: string;
  description!: string;
  image!: string;
  quantity!: string;
  price!: string
}

Element.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      // unique: "element_name",
    },
    description: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    // quantity: {
    //   type: Sequelize.STRING,
    // },
    price: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: my_Database,
    // tableName: "element",
  }
);


