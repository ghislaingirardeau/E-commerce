const express = require('express')
const villages = require('../controllers/villages')
const language = require('../middleware/language')

const router = express.Router()

router.post('/', villages.allVillages)
router.post('/:id', villages.oneVillage)

router.get('/fetch', villages.fetchVillages)


module.exports = router