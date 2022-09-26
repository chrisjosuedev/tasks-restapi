const express = require('express');
const cors = require('cors');

const { db } = require('../db/connection');
require('../db/references');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Connect to Database
        this.database();

        // Paths
        this.path = {
            auth: '/api/v1/auth',
            users: '/api/v1/users',
            tasks: '/api/v1/tasks',
            categories: '/api/v1/categories',
            role: '/api/v1/roles',
            search: '/api/v1/search'
        }

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

    }

    async database() {
        try {
            await db.sync({ force: false });
            console.log('Database connected');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));  
    }

    routes() {
        this.app.use(this.path.users, require('../routes/users.routes'))
        this.app.use(this.path.auth, require('../routes/auth.routes'))
        this.app.use(this.path.role, require('../routes/roles.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`)
        })
    }
}

module.exports = Server;
