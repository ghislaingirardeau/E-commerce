const db = require("../datas/db.js");
const mysql = require("mysql");
const config = require("../config");

function closeDb(connection) {
  connection.end(function (err) {
    if (err) {
      return console.log("error:" + err.message);
    }
  });
}

exports.allVillages = async (req, res, next) => {
  const connection = await mysql.createConnection(config);
  if (connection) {
    const sql = `SELECT * FROM communities_${req.body.lang};`;

    connection.query(sql, (error, results, fields) => {
      if (error) {
        res.status(404).json({ message: error });
        closeDb(connection);
      } else if (results) {
        res.status(200).json(results);
        closeDb(connection);
      }
    });
  }
};

exports.oneVillage = async (req, res, next) => {
  const connection = await mysql.createConnection(config);
  if (connection) {
    const sql = `SELECT * FROM communities_${req.body.lang} WHERE id_community=${req.params.id};`;

    connection.query(sql, (error, results, fields) => {
      if (error) {
        res.status(404).json({ message: "echec" });
        closeDb(connection);
      } else if (results) {
        res.status(200).json(results);
        closeDb(connection);
      }
    });
  }
};

exports.fetchVillages = async (req, res, next) => {
  const connection = await mysql.createConnection(config);
  if (connection) {
    const sql = `SELECT * FROM communities_fr;`;

    connection.query(sql, (error, results, fields) => {
      if (error) {
        res.status(404).json({ message: "echec" });
        closeDb(connection);
      } else if (results) {
        res.status(200).json(results);
        closeDb(connection);
      }
    });
  }
};
