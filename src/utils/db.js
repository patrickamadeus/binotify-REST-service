const { Pool } = require("pg");

const createConnection = async () => {
    const pool = new Pool({
        user: process.env.EPIFY_USER,
        host: process.env.EPIFY_HOST,
        database: process.env.EPIFY_DBNAME,   
        password: process.env.EPIFY_PASS,
        port: process.env.EPIFY_PORT
    });

    return pool;
}

module.exports = createConnection;