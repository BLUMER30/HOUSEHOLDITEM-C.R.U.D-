import { DataTypes } from "sequelize";
import sequelize from '../config.js';

const HouseHoldItems = sequelize.define('HouseHoldItems', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    source: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue:0
    },
    description: {
        type: DataTypes.TEXT
    }
});

export default HouseHoldItems;