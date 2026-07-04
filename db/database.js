const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    'personal_budget',
    'postgres',
    'YOUR_PASSWORD',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);

module.exports = sequelize;