const dotenv = require('dotenv').config()
const cron = require('cron');
const { dbConnect } = require('./db')
const Product = require('./models/Product')
const { listeningBot } = require('./jumbot')
const { sendTCPromotions, sendAllPromotions, sendActivePromotions } = require('./jobs')

const testing = true

async function startBot(){
    await dbConnect()
    console.log('[DB] connected')
    listeningBot()
    if(testing) cronSimulator() //DEVELOP FUNCTION
    if(!testing) jumbot.start() //PRODUCTION FUNCTION
}

const jumbot = new cron.CronJob('00 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0 * * *', async function() {
    const currentHour = new Date().getHours()
    console.log('[JOBS] started')

    if(currentHour === 12){
        console.log('[JOBS] free channel started')
    }
    console.log('[JOBS] vip channel started')
});


async function cronSimulator(){
    // await sendTCPromotions()
    await sendActivePromotions({testing: testing})
}

startBot()