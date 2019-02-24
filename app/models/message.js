'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');

let Message = sequelize.define('message', {
    message: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    seen_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    receiver: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
    }
});

module.exports = Message;