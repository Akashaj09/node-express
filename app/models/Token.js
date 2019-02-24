const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');

const TokenSchema = {
    access: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

let Token = sequelize.define('token', TokenSchema);

module.exports = Token;