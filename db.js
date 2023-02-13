const mongoose = require('mongoose')
const { updateLog } = require('./utils')

const uri = process.env.DB_URI

function dbConnect() {
    updateLog('[DB] Conectando...')
    mongoose.set('strictQuery', false)
    return mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true} )
}

function dbDisconnect() {
    return mongoose.disconnect()
}

module.exports = {
    dbConnect,
    dbDisconnect
}