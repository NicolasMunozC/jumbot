const { sendVipMessage, sendFreeMessage, sendTestMessage, sendPrivateMessage } = require("./jumbot");
const {  getAllProductsWithTCPromotions, getPriceFormatted, getProductToSend, getAllProductsWithPromotions, getDateFormatted, getDateValue, getProductsWithCheckedValidPromotions } = require("./utils");


async function sendTCPromotions({testing}){
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

async function sendAllPromotions({testing}){
    const products = await getAllProductsWithPromotions()
    products.forEach( async (product, i) => {
        const productToSend = await getProductToSend(product)
        const newMessage = (`*${productToSend.productName}* \nPrecio Normal: ${getPriceFormatted(productToSend.normalPrice)} \nPrecio Oferta: ${getPriceFormatted(productToSend.offerPrice)}\nCantidad: ${productToSend.unitMultiplier} ${productToSend.measurementUnit}\n${
            productToSend.promotions.map( promotion => {
                const promotionType = promotion.type
                let promotionPrice = 0
                let promotionNeeds = ''
                if(promotionType === 'm'){ promotionPrice = promotion.value }
                if(promotionType === 'p') { promotionPrice = ((productToSend.normalPrice)*(1-(promotion.value/100)))}
                if(!promotion.tcenco && !promotion.cencoPrime) promotionNeeds = 'todo medio de pago'
                if(promotion.tcenco) promotionNeeds = 'Tarjeta cencosud'
                if(promotion.cencoPrime) promotionNeeds = 'Jumbo Prime'
                return `Oferta con *${promotionNeeds}*: ${getPriceFormatted(promotionPrice)}\n_Esta oferta comienza el: ${getDateFormatted(promotion.start)} y termina el ${getDateFormatted(promotion.end)}_\nPublicada en: ${promotion.where}\n`
            })}URL: https://jumbo.cl/${productToSend.url}/p\n_Nota: El link no se abre con la app jumbo (ya descubriremos como hacerlo) se debe abrir desde el navegador_`)

        if(!testing){
            setTimeout( () => {
                sendPrivateMessage(newMessage)
            },4000*i )
        } else {
            setTimeout( () => {
                sendTestMessage(newMessage)
            },4000*i)
        }
    })
}

async function sendActivePromotions({testing}){
    let productsToSend = []
    const products = await getProductsWithCheckedValidPromotions()
    products.forEach( product => {
        if(product.promotions.length > 0){
            productsToSend.push(product)
        }
    })
    productsToSend.forEach( (product, i) => {
        const newMessage = `*${product.productName}*\nPrecio Normal: ${getPriceFormatted(product.normalPrice*product.unitMultiplier)}\nPrecio Oferta: ${getPriceFormatted(product.offerPrice*product.unitMultiplier)}\nCantidad: ${product.unitMultiplier} ${product.measurementUnit}\n${
            product.promotions.map( promotion => {
                const promotionType = promotion.type
                let promotionPrice = 0
                let promotionNeeds = ''
                if(promotionType === 'm'){ promotionPrice = promotion.value*product.unitMultiplier }
                if(promotionType === 'p') { promotionPrice = (((product.normalPrice)*(1-(promotion.value/100)))*product.unitMultiplier)}
                if(!promotion.tcenco && !promotion.cencoPrime) promotionNeeds = 'todo medio de pago'
                if(promotion.tcenco) promotionNeeds = 'Tarjeta cencosud'
                if(promotion.cencoPrime) promotionNeeds = 'Jumbo Prime'
                return `Oferta con *${promotionNeeds}*: ${getPriceFormatted(promotionPrice)}\n_Esta oferta comenzo el: ${getDateFormatted(promotion.start)} y terminara el ${getDateFormatted(promotion.end)}_\nPublicada en: ${promotion.description === 'SPID' ? 'App SPID' : 'Jumbo.cl'}\n`
            })
        }URL: https://jumbo.cl/${product.url}/p\n_Nota: El link no se abre con la app jumbo (ya descubriremos como hacerlo) se debe abrir desde el navegador_`

        if(testing){
            setTimeout( () => {
                sendTestMessage(newMessage)
            }, 4000*i)

        } else {
            setTimeout( () => {
                sendFreeMessage(newMessage)
            }, 4000*i)
        }

        
    })
}

async function sendVipSuperOffers(){
    
}

module.exports = {
    sendActivePromotions,
    sendAllPromotions,
}