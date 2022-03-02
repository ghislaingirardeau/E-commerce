const express = require('express')
const villages = require('../controllers/villages')

const router = express.Router()

router.post('/', villages.allVillages)

module.exports = router