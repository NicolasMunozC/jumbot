const mongoose = require('mongoose')

const uri = process.env.DB_URI

function dbConnect() {
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