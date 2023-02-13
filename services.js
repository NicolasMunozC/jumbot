const Product = require('./models/Product')
const Promotion = require('./models/Promotion')

function fetchAllProducts(){
    return Product.find({})
}

function savePromotion(promotion){
    const newPromotion = new Promotion(promotion)
    return newPromotion.save()
}

function deleteAllPromotion(){
    return Promotion.deleteMany({})
}



module.exports = {
    fetchAllProducts,
    savePromotion,
    deleteAllPromotion,
}