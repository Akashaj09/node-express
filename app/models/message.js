const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');

let Message = sequelize.define('message', {
    message: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user: {
        type: Sequelize.INTEGER.UNSIGNED,
        reference: {
            model: User,
            key: 'id'
        }
    },
    seen_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    seen_by: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
    }
});
Message.sync({ force: true });