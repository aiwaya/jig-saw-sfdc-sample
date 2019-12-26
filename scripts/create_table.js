const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});


client.connect();
client.query('CREATE TABLE IF NOT EXISTS data (id SERIAL, v1 INTEGER, v2 TIMESTAMP, v3 CHAR(255), v3 CHAR(255), v4 CHAR(255), v5 CHAR(255), v6 CHAR(255), v7 CHAR(255), v8 CHAR(255), v9 CHAR(255), serial_no CHAR(255)', (err, res) => {
    if (err) {
        return console.error('error with PostgreSQL database', err);
    }
    client.end();
});