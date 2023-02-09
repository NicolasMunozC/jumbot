const mongoose = require('mongoose');
const { Schema } = mongoose;

const product = new Schema({
    productId: { type: String, required: true, unique: true},
    productName: String,
    category: String,
    brand: String,
    productReference: String,
    linkText: String,
    // origen: Array,
    supermarket: {type: String, default: 'Jumbo'},
    prices: {
        price: Number,
        listPrice: Number,
        priceWithoutDiscount: Number,
        availableQuantity: Number,
        priceHistory : {type: Array, default: []},
        dateHistory : {type: Array, default: []},
    },
    unitMultiplier: Number,
    measurementUnit: String,
    images: {
        imageUrl: String,
        imageTag: String,
    },
    promotions: Array,
    promotionsUpdate: Date,
    created: {type: Date, default: Date.now},
    lastUpdate: Date,
});

module.exports = mongoose.model('Product', product)