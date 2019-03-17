const Op = require('sequelize').Op;
const User = require('../../models/user');
const Message = require('../../models/message');

let users = (user) => {
    return new Promise((resolve, reject) => {
        User.findAll({
            where: {
                id: {
                    [Op.ne] : [user.id]
                }
            },
            order: [
                ['id', 'desc']
            ]
        }).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
};

let messages = (receiver, user) => {
    return new Promise((resolve, reject) => {
         Message.findAll({
            where:{
                receiver: {
                    [Op.or]: [receiver, user.id],
                },
                userId: {
                    [Op.or]: [receiver, user.id]
                }
            },
             order: [
                 ['id', 'desc']
             ],
             limit: 20,
             offset: 0
         }).then((messages) => {
             return resolve(messages.reverse());
         }).catch(error => {
             return reject(error);
         })
    });
};

let lastMessage = (user) => {
    return new Promise((resolve, reject) => {
        Message.findOne({
            where:{
                receiver: user.id
            },
            order: [
                ['id', 'desc']
            ]
        }).then((message) => {
            if (message !== null){
                resolve(message);
            }
            if (message === null){
                findLastUser(user).then(user => {
                    resolve({
                        userId: user.id
                    });
                }).catch();
            }
        }).catch((error => {
            findLastUser(user).then(user => {
                resolve({
                    userId: user.id
                });
            })
        }))
    });
};

let storeMessage = (message) => {
    return new Promise((resolve, reject) => {
        Message.create({
            message: message.message,
            receiver: message.receiver,
            userId: message.userId
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

let findLastUser = (user) => {
   return User.findOne({
      where: {
          id: {
              [Op.ne]: [user.id]
          }
      },
      order: [
          ['id', 'desc']
      ]
  }).then(user => {
      return user;
   }).catch(error => {
       return error;
   })
};

module.exports = {
    users,
    messages,
    lastMessage,
    storeMessage
};