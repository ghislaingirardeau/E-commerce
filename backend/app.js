const express = require('express') /* IMPORTE LES PACKAGES */
const i18n = require('./routes/i18n')
const villages = require('./routes/villages')
const stripe = require('./routes/stripe')
const path = require('path')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json())

app.get('/', (req, res) => res.send('Success!!!'))
app.use('/images', express.static(path.join(__dirname, 'images'))) 

app.use('/api/i18n', i18n)
app.use('/api/villages', villages)
app.use('/api/stripe', stripe)

module.exports = app 