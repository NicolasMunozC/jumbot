const { fetchAllProducts } = require("./services");
const moment = require('moment-timezone')
const fs = require('fs')

function updateLog(message){
    fs.appendFile('log.txt', '', error => {if(error)console.log('Error al crear el archivo: ', error)})
    const newMessage = `[Chile: ${getCurrentDateChile()}] - [Server: ${getCurrentDateServer()}] -> ${message}\n`
    console.log(newMessage);
    fs.appendFile('log.txt', newMessage, (error) => { if(error)console.log('Hubo un error al actualizar el archivo: ', error)})
}

function getCurrentDateChile(){ 
    return moment.tz('America/Santiago').format('DD/MMM/YYYY - HH:mm:ss') 
}

function getCurrentDateServer(){ 
    return moment.tz().format('DD/MMM/YYYY - HH:mm:ss') 
}


async function getAllProductsWithPromotions(){
    const allProducts = await fetchAllProducts()
    let allProductsWithPromotions = []
    allProducts.forEach( product => {
        if(product.promotions.length > 0 && product.productName){
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


function getAllPromotionsFormatted(allPromotions){
    if(!allPromotions) console.error('You must provide an Object with all promotions.');
    let allPromotionsFormatted = []
    allPromotions.forEach( promotion => {
        const newPromotion = {
            type: promotion.type,
            value: promotion.value,
            start: promotion.start,
            end: promotion.end,
            where: promotion.description,
            quantity: promotion.quantity,
            tcenco: promotion.tcenco,
            cencoPrime: promotion.cencoPrime,
        }
        allPromotionsFormatted.push(newPromotion)
    })
    return allPromotionsFormatted
}

async function getProductToSend(product){
    const allPromotions = await getAllPromotionsFormatted(product.promotions)
    const productToSend = {
    productName: product.productName,
    brand: product.brand,
    url: product.linkText,
    normalPrice: product.prices.priceWithoutDiscount * product.unitMultiplier,
    offerPrice: product.prices.price * product.unitMultiplier, 
    unitMultiplier : product.unitMultiplier,
    measurementUnit: product.measurementUnit,
    promotions: allPromotions
    }
    return productToSend
}

function getDateFormatted(date){
    const newDate = new Date(date)
    const opts = { year: 'numeric', month: 'long', day: 'numeric'}
    const humanDate = newDate.toLocaleDateString('es-ES'. opts)
    return humanDate
}

function getDateValue(date){
    const newDate = new Date(date)
    return newDate.getTime()
}

function checkPromotions(promotions){
    let allValidPromotions = []
    promotions.forEach(promotion => {
        if(getDateValue(promotion.start) < Date.now().valueOf() && getDateValue(promotion.end) > Date.now().valueOf() ) {
            allValidPromotions.push(promotion)
        }
    })
    return allValidPromotions
}

async function getProductsWithCheckedValidPromotions(){
    let checkedProducts = []
    const products = await getAllProductsWithPromotions()
    products.forEach( product => {
        const validPromotions = checkPromotions(product.promotions)
        if(validPromotions.length > 0) {
            const newProduct = {
                productName: product.productName,
                brand: product.brand,
                url: product.linkText,
                measurementUnit: product.measurementUnit,
                unitMultiplier: product.unitMultiplier,
                normalPrice: product.prices.listPrice,
                offerPrice: product.prices.price,
                promotions: validPromotions,
            }
            checkedProducts.push(newProduct)
        }
    })
    return checkedProducts
}


module.exports = {
    getAllProductsWithTCPromotions,
    getPriceFormatted,
    getAllProductsWithPromotions,
    getAllPromotionsFormatted,
    getProductToSend,
    getDateFormatted,
    getDateValue,
    checkPromotions,
    getProductsWithCheckedValidPromotions,
    updateLog
}