const mysql = require("mysql2");
const pool = mysql
  .createPool({
    host: "127.0.0.1",
    port: 3309,
    user: "root",
    password: "",
    database: "onlineshopBE",
  })
  .promise();

module.exports = pool;
