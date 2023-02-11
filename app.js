const dotenv = require('dotenv').config()
const cron = require('cron');
const { dbConnect } = require('./db')
const Product = require('./models/Product')
const { listeningBot } = require('./jumbot')
const { sendTCPromotions, sendAllPromotions, sendActivePromotions } = require('./jobs')

const testing = false

async function startBot(){
    await dbConnect()
    console.log('[DB] connected')
    listeningBot()
    if(testing) cronSimulator() //DEVELOP FUNCTION
    if(!testing) jumbot.start() //PRODUCTION FUNCTION
}

const jumbot = new cron.CronJob('00 12 * * *', async function() {
    await sendActivePromotions({testing: testing})
});


async function cronSimulator(){
    // await sendTCPromotions()
    await sendActivePromotions({testing: testing})
}

startBot()