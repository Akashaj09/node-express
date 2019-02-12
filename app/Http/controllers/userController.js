let User = require('../../models/user');
let bcrypt = require("bcrypt");

let createUser = (user) => {
    return new Promise((resolve, reject) => {
        User.create({ name: user.name,
            email: user.email,
            password: user.password !== '' ? bcrypt.hashSync(user.password, 10): '' }).then(() => {
            resolve({
                status: true,
                message: 'Your account has been created successfully'
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
        }).then((response) => {
            if (!response){
                return reject({
                    status: false,
                    message: 'User not found'
                });
            }
            bcrypt.compare(user.password, response.password, function(error, response)  {
                if(error){
                    return reject({
                        status: false,
                        message: 'Password is incorrect'
                    });
                }
                if (response){
                    return resolve({
                        status: true,
                        message: 'You are ready to login'
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

module.exports = {
    createUser,
    login
};