const User = require('../../models/user');
const bcrypt = require("bcrypt");
const Token = require('../../models/Token');
const jwt = require('jsonwebtoken');
let createUser = (user) => {
    return new Promise((resolve, reject) => {
        User.create({ name: user.name,
            email: user.email,
            password: user.password !== '' ? bcrypt.hashSync(user.password, 10): ''
        }).then((user) => {
            createAccessToken(user).then(response => {
                resolve({
                    status: true,
                    message: 'Successfully logged in',
                    name: user.name,
                    email: user.email,
                    token: response.token
                });
            });
        }).catch((error) =>   {
            reject(error);
        });
    });
};

let login = (user) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            where: {
                email: user.email
            }
        }).then((existUser) => {
            if (!existUser){
                return reject({
                    status: false,
                    message: 'User not found'
                });
            }
            bcrypt.compare(user.password, existUser.password, (error, response) =>  {
                if(error){
                    return reject({
                        status: false,
                        message: 'Password is incorrect'
                    });
                }
                if (response){
                    createAccessToken(existUser).then(response => {
                        return resolve({
                            status: true,
                            message: 'Successfully logged in',
                            token: response.token,
                            email: existUser.email,
                            name: existUser.name
                        });
                    });
                }
            });
        }).catch((error) => {
            return reject({
                status: false,
                message: 'User not found'
            });
        });
    });
};

let createAccessToken = (user) => {
    const token = jwt.sign({_id: user.id}, 'abcd123').toString();
    return Token.create({
        userId: user.id,
        access: 'auth',
        token
    }).then(response => {
        return response
    });
};

module.exports = {
    createUser,
    login
};