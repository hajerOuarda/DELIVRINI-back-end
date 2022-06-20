import Sequelize, { Model } from "sequelize";
import my_Database from "../../database/database";

export class Ingredients extends Model {
    name!: string;
}

Ingredients.init(
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: "ingredient_name",
        },
    },
    {
        sequelize: my_Database,
        // tableName: "ingredient",
    }
);


