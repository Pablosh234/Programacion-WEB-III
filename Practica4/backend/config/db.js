import mysql from  'mysql2';
const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'',
    database:'bsd_react'
}).promise();

export default pool;