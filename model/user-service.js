const pool = require("../config/mysql-config");

exports.getUsers = async (limit) => {
  try {
    if (limit) {
      const [rows] = await pool.query(`select * from user limit ${limit}`);

      return rows;
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const [row] = await pool.query(`SELECT * FROM user where emp_no=${id}`);
    return row[0];
  } catch (err) {
    console.log(err);
  }
};
