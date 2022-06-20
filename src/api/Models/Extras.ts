import Sequelize, { Model } from "sequelize";
import my_Database from "../../database/database";



export class Extras extends Model {
    name!: string;
    price!: string;
}

Extras.init(
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: "extras_name",
        },
        price: {
            type: Sequelize.STRING,
        }
    },
    {
        sequelize: my_Database,
        // tableName: "extras",
    }
);


