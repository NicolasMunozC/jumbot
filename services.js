const Product = require('./models/Product')

function fetchAllProducts(){
    return Product.find({})
}



module.exports = {
    fetchAllProducts
}