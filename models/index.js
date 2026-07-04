const { FOREIGNKEYS } = require('sequelize/lib/query-types');
const Envelope = require('./Envelope');
const Transaction = require('./Transaction');
const User = require('./User');

Envelope.hasMany(Transaction, {
    foreignKey: 'envelope_id'
});

Transaction.belongsTo(Envelope, {
    foreignKey: 'envelope_id'
});

User.hasMany(Envelope, {
    foreignKey: 'user_id'
});

Envelope.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {
    User,
    Envelope,
    Transaction
};