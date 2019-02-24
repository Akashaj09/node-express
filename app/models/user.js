'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Token = require('./Token');
const Message = require('./message');
const jwt = require('jsonwebtoken');

let UserSchema = {
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
};

let User = sequelize.define('user', UserSchema, {
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});
User.auth =  (token) => {
    let decoded = jwt.verify(token, 'abcd123');
    return Token.findOne({
        where: {
            token,
            userId: decoded._id,
            access: 'auth'
        },
        include: [
            User
        ]
    }).then((token) => {
        return {
            name: token.user.name,
            email: token.user.email,
            createdAt: token.user.createdAt
        };
    }).catch(response => {
        return {
            status: false,
            message: "This token is invalid"
        }
    })
};

User.hasMany(Token, {as: 'tokens', foreignKey: 'userId'});
User.hasMany(Message, { as: 'messages', foreignKey: 'userId' });
Token.belongsTo(User);
Message.belongsTo(User);
module.exports = User;
