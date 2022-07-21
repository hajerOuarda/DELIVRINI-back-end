import Sequelize, { Model } from "sequelize";
import my_Database from "../../database/database";

export class Ingredients extends Model {
    ingredientName!: string;
}

Ingredients.init(
    {
        ingredientName: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: "ingredient_name",
        },
    },
    {
        sequelize: my_Database,
        // tableName: "ingredient",
    }
);


