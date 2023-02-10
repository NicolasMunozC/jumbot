const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
    userId: { type: Number, required: true, unique: true},
    username: String,
    firstName: String,
    lastName: String,
    free: {type: Boolean, default: false},
    vip: {
        active: {type: Boolean, default: false},
        start: Date,
        end: Date,
    },
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', user)