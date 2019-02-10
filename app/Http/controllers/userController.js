let User = require('../../models/user');
let bcrypt = require("bcrypt");

let createUser = (user) => {
    return new Promise((resolve, reject) => {
        User.create({ name: user.name, email: user.email, password: bcrypt.hashSync(user.password, 10) }).then(() => {
            resolve({
                status: true,
                message: 'Your account has been created successfully'
            });
        }).catch((error) =>   {
            reject({
                status: false,
                message: 'One of our developer is responsible for that, We will fire him'
            })
        });
    });
};

module.exports = {
    createUser
};