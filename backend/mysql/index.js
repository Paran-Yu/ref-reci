const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'i5a203.p.ssafy.io',
    user: 'user',
    password: '수정해주세요',
    database: 'project',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306,
});

module.exports = { pool };
