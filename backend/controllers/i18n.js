const db = require('../datas/db.js')
const mysql = require('mysql')
const config = require('../config')
const fetch = require('cross-fetch');

function closeDb(connection) {
    connection.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
    });
}

exports.allDatas = async (req, res, next) => {
    try {
        // get the rates updated convertion
        const rates = await fetch('http://api.exchangeratesapi.io/v1/latest?access_key=d9e12369a0e36187473de1bf64662704&symbols=USD,KHR,EUR')
        const user = await rates.json();
        let rate

        switch (req.body.lang) {
            case 'en':
                rate = user.rates.USD
                break;
            case 'fr':
                rate = user.rates.EUR
                break;
            case 'kh':
                rate = user.rates.KHR
                break;
        }

        const connection = await mysql.createConnection(config)
        if (connection) {

            const sql = `SELECT products_${req.body.lang}.id_product AS id, products_${req.body.lang}.name, category, products_${req.body.lang}.description, image_url, price, products.id_community AS id_community, communities_${req.body.lang}.name AS communityName, communities_${req.body.lang}.description AS communityDescription FROM products_${req.body.lang} INNER JOIN products ON products_${req.body.lang}.id_product=products.id_product INNER JOIN communities_${req.body.lang} ON products.id_community=communities_${req.body.lang}.id_community;`

            connection.query(sql, (error, results, fields) => {

                if (error) {
                    res.status(404).json({ message: "echec" })
                    closeDb(connection)
                } else if (results) {
                    // convert the price
                    results.forEach(element => {
                        element.price = parseInt(element.price * rate)
                    });
                    res.status(200).json(results)
                    closeDb(connection)
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}
