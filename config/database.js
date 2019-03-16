const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_chat', 'phpmyadmin', '1106', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = sequelize;