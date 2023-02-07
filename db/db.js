const mongoose = require('mongoose')
const dotenv = require('dotenv').config()


const DB_URI = process.env.DB_URI

function connect() {
    mongoose.set('strictQuery', false)
    return mongoose.connect( DB_URI, { useNewUrlParser: true, useUnifiedTopology: true} )
}

function disconnect() {
    return mongoose.disconnect()
}

module.exports = {
    connect,
    disconnect
}