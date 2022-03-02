const db = require('../datas/db.js')

exports.allDatas = async (req, res, next) => {
    let products
    let villages
    if (req.body.lang === 'en') {
        products = db.productsen
        villages = db.villagesen
    } else {
        products = db.productsfr
        villages = db.villagesfr
    }
    res.status(200).json({ products, villages})
}
