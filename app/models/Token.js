const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');

const TokenSchema = {
    user: {
        type: Sequelize.INTEGER.UNSIGNED,
        reference: {
            model: User,
            key: 'id'
        }
    },
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