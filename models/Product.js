const mongoose = require('mongoose');
const { Schema } = mongoose;

const product = new Schema({
    productId: String,
    productName: String,
    brand: String,
    productReference: String,
    // categoriesIds: Array,
    // categories: String,
    linkText: String,
    // origen: Array,
    supermarket: String,
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
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Product', product)