const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');

const User = db.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            validate: {
                len: [8, 16],
            },
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [8, 64],
            },
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

// Don't return Password in json resp
User.prototype.toJSON = function () {
    const { password, ...user } = Object.assign({}, this.get());
    return user;
};

module.exports = User;
