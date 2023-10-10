const knex = require('knex')
require('dotenv').config()

    const instancia = knex ({
        client: 'pg',
        connection: process.env.DB_URL
    })

module.exports = instancia