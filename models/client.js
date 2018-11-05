const db = require('../api/db');

module.exports = db.defineModel('client', {
    name: {
        type: db.STRING(50),
        primaryKey: true
    },
    password: db.STRING(100),
});