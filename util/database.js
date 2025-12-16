const mysql=require('mysql2');
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'voluntrip',
    password:'qwerty123'
});
module.exports=pool.promise();
