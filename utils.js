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

async function getAllProductsWithTCPromotions(){
    const productsWithPromotions = await getAllProductsWithPromotions()
    const allProductsWithTCPromotions = []
    productsWithPromotions.forEach( product => {
        const promotions = product.promotions
        promotions.forEach( promotion => {
            if(promotion.tcenco && product.productName) { 
                const newProduct = {
                    productId: product.productId,
                    productName: product.productName,
                    normalPrice: product.prices.listPrice,
                    offerPrice: product.prices.price,
                    url: product.linkText,
                    promotion: {
                        type: promotion.type,
                        value: promotion.value,
                        end: promotion.end,
                        where: promotion.description,
                        quantity: promotion.quantity
                    }
                }
                allProductsWithTCPromotions.push(newProduct) 
            }
        })
    })
    return allProductsWithTCPromotions
}

function getPriceFormatted(value){
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    })
    const formattedPrice = formatter.format(value)
    return formattedPrice
}


module.exports = {
    getAllProductsWithTCPromotions,
    getPriceFormatted,
}