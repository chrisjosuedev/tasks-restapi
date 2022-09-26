const { Sequelize } = require('sequelize');

/**
 * In-Memory Connection
 *  const db = new Sequelize('sqlite::memory:')
 */

/** In Disk Connection */

const db = new Sequelize('tasks', 'user', 'pass', {
    dialect: 'sqlite',
    host: './db/tasks.sqlite'
})

module.exports = { db };
