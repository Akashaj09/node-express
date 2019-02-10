const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const bcrypt = require('bcrypt');
let User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    email: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    password: {
        type: Sequelize.STRING
    }
});

module.exports = User;
