const {DataTypes} = require('sequelize');
const sequelize = require('../db/database');

const Transaction = sequelize.define('Transaction', {
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    recipient: {
        type: DataTypes.STRING,
        allowNull: false
    },

    transaction_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

module.exports = Transaction;