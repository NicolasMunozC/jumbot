const dotenv = require('dotenv').config()
const cron = require('cron');
const { dbConnect } = require('./db')
const Product = require('./models/Product')
const { listeningBot } = require('./jumbot')
const { sendActivePromotions, sendAllPromotions } = require('./jobs');
const { updateLog } = require('./utils');

const testing = true
const version = '1.0'

async function startBot(){
    updateLog(`Bot iniciado, version:${version}.`)
    await dbConnect()
    updateLog('[DB] Conectada.')
    listeningBot()
    if(testing) cronSimulator() //DEVELOP FUNCTION
    if(!testing) jumbot.start() //PRODUCTION FUNCTION
}

const jumbot = new cron.CronJob('00 7 * * *', async function() {
    updateLog('Se ejecutan tareas programadas...')
    await sendActivePromotions({testing: testing})
    await sendAllPromotions({testing: testing})
    updateLog('Tareas programadas completadas.')
});


async function cronSimulator(){
    console.log('SE EJECUTA SIMULADOR DE TESTING');
    await sendActivePromotions({testing: testing})
    await sendAllPromotions({testing: testing})
    console.log('SE COMPLETO SIMULADOR DE TESTING');
}

startBot()