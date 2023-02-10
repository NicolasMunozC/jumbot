const mongoose = require('mongoose')

const uri = process.env.DB_URI

function dbConnect() {
    console.log('[DB] connecting')
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