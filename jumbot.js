const TelegramBot = require('node-telegram-bot-api');
const opts = { parse_mode: 'Markdown' }

const token = process.env.TELEGRAM_TOKEN_API;
const vipChatId = process.env.VIP_CHAT_ID
const freeChatId = process.env.FREE_CHAT_ID

const bot = new TelegramBot(token, {polling: true});


function testingBot(){
    console.log('Bot esta funcionando');
}    

function listeningBot(){
    bot.on('message', msg => {
        const chatId = msg.chat.id
        bot.sendMessage(chatId, `Hola ${msg.chat.first_name}! Bienvenid@! ❤️`) 
        bot.sendMessage(chatId, `${msg.chat.first_name} este es tu id: ${chatId}`)
    })
}

function sendMessage(id, message){
    bot.sendMessage(id, message)
}

function sendVipMessage(message){
    bot.sendMessage(vipChatId, message, opts)
}

function sendFreeMessage(message){
    bot.sendMessage(freeChatId, message, opts)
}

module.exports = {
    listeningBot,
    sendMessage,
    sendVipMessage,
    sendFreeMessage,
    testingBot,
}