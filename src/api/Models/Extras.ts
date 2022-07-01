import Sequelize, { Model } from "sequelize";
import my_Database from "../../database/database";



export class Extras extends Model {
    name!: string;
    price!: string;
}

Extras.init(
    {
        extrasName: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: "extras_name",
        },
        extrasPrice: {
            type: Sequelize.STRING,
        }
    },
    {
        sequelize: my_Database,
        // tableName: "extras",
    }
);


