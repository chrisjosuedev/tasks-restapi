const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');

const Role = db.define(
    'Role',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Role;
