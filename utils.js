const { fetchAllProducts } = require("./services");


async function getAllProductsWithPromotions(){
    const allProducts = await fetchAllProducts()
    let allProductsWithPromotions = []
    allProducts.forEach( product => {
        if(product.promotions.length > 0){
            allProductsWithPromotions.push(product)
        }
    })
    return allProductsWithPromotions
}




module.exports = {
    getAllProductsWithPromotions
}