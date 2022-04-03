import { Model, DataTypes } from 'sequelize';
import db from '../config/database.config';

interface TodoAttributes {
    id: string;
    title: string;
    completed: boolean;
}

export class Todoinstance extends Model<TodoAttributes> { }

Todoinstance.init(
    {
        "id": {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        }
    },
    {
        sequelize: db,
        tableName: 'todos'
    }
);

