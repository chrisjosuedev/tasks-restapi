const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');

const Task = db.define(
    'Task',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Task;
