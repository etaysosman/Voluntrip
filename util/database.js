const mysql=require('mysql2');
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'voluntrip',
    password:'QAZwsx123123@'
});
module.exports=pool.promise();
