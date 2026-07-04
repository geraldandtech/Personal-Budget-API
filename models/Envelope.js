const {DataTypes} = require('sequelize');
const sequelize = require('../db/database');

const Envelope = sequelize.define('Envelope', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    budget: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
});

module.exports = Envelope;