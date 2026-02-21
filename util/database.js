// Import the mysql2 library
const mysql = require('mysql2');

// Create a connection pool 
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'voluntrip',
    password: 'qwerty123'
});

// Export the pool with Promise 
module.exports = pool.promise();