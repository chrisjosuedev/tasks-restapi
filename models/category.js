const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');

const Category = db.define(
    'Category',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Category;
