const db = require('../database/dbConfig');

module.exports = {
    register,
    login,
    findById
}

async function register(user) {
    const [id] = await db('users').insert(user, 'id');

    return findById(id);
}

function login(filter) {
    return db('users').where(filter);
}

function listUsers() {
    return db('users');
}

function findById(id) {
    return db('users').where({id}).first();
}