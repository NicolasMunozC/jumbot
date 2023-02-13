const Product = require('./models/Product')
const Promotion = require('./models/Promotion')

function fetchAllProducts(){
    return Product.find({})
}

function savePromotion(promotion){
    const newPromotion = new Promotion(promotion)
    return newPromotion.save()
}



module.exports = {
    fetchAllProducts,
    savePromotion,
}