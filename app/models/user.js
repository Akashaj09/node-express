const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

let User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: {
                msg: 'This is not a valid email'
            },
            notEmpty: {
                msg: 'Email field is required'
            },
            min: 4,
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: 'Password field is required'
            },
            min: 6
        }
    }
});

module.exports = User;
