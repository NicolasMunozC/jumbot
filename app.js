const { connect, disconnect } = require('./db/db')
const Product = require('./models/Product')



async function checkProducts(){
    let checkedProducts = []
    
    const products = await getAllProducts()
    if(products && products.length > 0) {
        products.map( (product) => {
            const oldPrice = getOldPrice(product.prices.priceHistory)
            if(product.prices.price < oldPrice){ 
                console.log(product);
                checkedProducts.push(product) 
            }
        }) 
    } else { console.log('No hay data')}
    
}


async function getAllProducts(){
    console.log('Se solicitaron todos los productos')
    await connect()
    console.log('Base datos conectada')
    try {
        const res = await Product.find({})
        if(res && res.length > 0) return res
    } catch (error) {
        console.log('Error: ',error)
        
    } finally {
        await disconnect()
        console.log('Base de datos desconectada')
    }
}

function getOldPrice(array){
    if(array.length > 2) return array[array.length - 2]
    return 0
}



checkProducts()