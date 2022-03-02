const express = require('express')
const i18n = require('../controllers/i18n')
const language = require('../middleware/language')

const router = express.Router()

router.get('/list', i18n.list)
router.post('/products', i18n.allDatas)

module.exports = router