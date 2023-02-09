const { sendVipMessage, sendFreeMessage, sendMessage } = require("./jumbot");
const {  getAllProductsWithTCPromotions, getPriceFormatted, getDateFormmated } = require("./utils");



async function sendTCPromotions(){
    const products = await getAllProductsWithTCPromotions()
    products.forEach( (product, index) => {
        const promotionType = product.promotion.type
        let promotionPrice = 0
        const normalPriceFormatted = getPriceFormatted(product.normalPrice)
        const offerPriceFormatted = getPriceFormatted(product.offerPrice)
        if(promotionType === 'm'){ promotionPrice = product.promotion.value }
        if(promotionType === 'p') { promotionPrice = ((product.normalPrice)*(1-(product.promotion.value/100)))}
        promotionPrice = getPriceFormatted(promotionPrice)
        const newMessage = (`*${product.productName}* \nPrecio Normal: ${normalPriceFormatted} \nPrecio Oferta: ${offerPriceFormatted}\nPrecio con Tarjeta Cencosud: ${promotionPrice}\nTipo oferta: ${product.promotion.where}\nURL: https://jumbo.cl/${product.url}/p`)
        setTimeout( () => {
            sendVipMessage(newMessage)
        }, 3000*index)
    })
}

module.exports = {
    sendTCPromotions
}