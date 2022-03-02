const db = require('../datas/db.js')
const mysql = require('mysql')
const config = require('../config')

function closeDb(connection) {
    connection.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
    });
}

exports.allDatas = async (req, res, next) => {

    const connection = await mysql.createConnection(config)
    if (connection) {

        const sql = `SELECT products_${req.body.lang}.id_product AS id, products_${req.body.lang}.name, category, products_${req.body.lang}.description, image_url, price, products.id_community AS id_community, communities_${req.body.lang}.name AS communityName, communities_${req.body.lang}.description AS communityDescription FROM products_${req.body.lang} INNER JOIN products ON products_${req.body.lang}.id_product=products.id_product INNER JOIN communities_${req.body.lang} ON products.id_community=communities_${req.body.lang}.id_community;`

        connection.query(sql, (error, results, fields) => {

            if (error) {
                res.status(404).json({ message: "echec" })
                closeDb(connection)
            } else if (results) {
                res.status(200).json(results)
                closeDb(connection)
            }
        })
    }
}
