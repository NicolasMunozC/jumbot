const TelegramBot = require('node-telegram-bot-api');
const opts = { parse_mode: 'Markdown' }
const { getUserData, saveUser } = require('./bot.utils');

const token = process.env.TELEGRAM_TOKEN_API;
const vipChatId = process.env.VIP_CHAT_ID
const freeChatId = process.env.FREE_CHAT_ID
const testChatId = process.env.TEST_CHAT_ID
const privateChatId = process.env.PRIVATE_CHAT_ID

const bot = new TelegramBot(token, {polling: true});

async function listeningBot(){
    bot.on('message', msg => {
        const chatId = msg.chat.id
        const userId = msg.from.id
        const userName = msg.from.first_name
        const newUser = {
            userId: userId,
            username: msg.from.username,
            firstName: msg.from.first_name,
            lastName: msg.from.last_name,
            free: true,
        }
        if(msg.text === '/info'){
            sendMessage(chatId, `Bueno, me presento, soy *Jumbot*, un bot desarrollado para mostrarte las mejores ofertas de Jumbo 🥸.\nHe creado dos canales de difusion para esto, *uno gratuito 🤩 y otro de pago 🤫*.\n\nEn mi *canal gratuito* enviare todas la ofertas que encuentre, *una vez al dia*. Con los precios actualizados hasta ese momento.\nEn el *canal VIP* 😎, es donde ocurre la magia, la suscripcion VIP, te da acceso al canal VIP, obviamente _dah 🫠_, ahi se publicaran los *productos en promocion y actualizando los precios cada hora.*\n\nAdemas de eso, todos los *usuarios VIP*, los tengo guardados en mi agenda, y apenas encuentre un cambio de precio *desde 50% de descuento o mas*, les notificare directamente en su chat 😏.\n\n_Nota: Mi creador dice que no se quiere hacer rico 🙄, bueno si, pero no 'robandoles' 🤷🏽‍♂️ , solo necesita el dinero para poder seguir con el proyecto, ya saben pagar servidor y apps y todo eso, cosas que yo no entiendo... Ni que fuera un robot... 🤖 _`)
        }
        if(msg.text === '/free'){
            const userData = getUserData(userId)
            if(!userData) saveUser(newUser)
            sendMessage(chatId, `${userName}, puedes entrar al canal con el siguiente enlace! 😄\nhttps://t.me/+RGByI7679pAxZGQx \n*Nota:* _No compartas este enlace, quien quiera ingresar debe solicitarmelo a mi para aceptarlo/a  jeje! 😳_`)
        }
        if(msg.text === '/vip'){        
            sendMessage(chatId, `${userName}, lamentamos decirte que nuestra funcionalidad VIP, aun no esta disponible 😓\nLos desarrolladores se encuentran un poco lentos 🙄, no les digas que yo dije eso jeje 🤪 \nPero en cuanto este disponible te notificare!! ya te guarde en mis contactos como '${userName} ❤️' 🤭, no me silencies mis notificaciones eh... 😡`)
        }

    })
    bot.on('chat_join_request', async req => {
        const channelId = req.chat.id.toString()
        const userId = req.from.id
        if(req.from.is_bot) await bot.declineChatJoinRequest(channelId, userId)
        const freeChannelId = process.env.FREE_CHAT_ID
        const vipChannelId = process.env.VIP_CHAT_ID
        const userData = await getUserData(userId)
        if(!userData) await bot.declineChatJoinRequest(req.chat.id, req.from.id)
        if(userData){
            if(channelId === freeChannelId && userData.free) {
                bot.approveChatJoinRequest(channelId, userId)
            }
            else if(channelId === vipChannelId && userData.vip.active){
                bot.approveChatJoinRequest(channelId, userId)
            } else{
                bot.declineChatJoinRequest(channelId, userId)
            } 
        }
    })

}

function sendMessage(id, message){
    if(!id || !message) console.error('You need to provide an ID, and a MESSAGE');
    bot.sendMessage(id, message, opts)
}

function sendTestMessage(message){
    if(!message) console.error('You need to provide a MESSAGE')
    bot.sendMessage(testChatId, message, opts)
}

function sendVipMessage(message){
    if(!message) console.error('You need to provide a MESSAGE')
    bot.sendMessage(vipChatId, message, opts)
}

function sendFreeMessage(message){
    if(!message) console.error('You need to provide a MESSAGE')
    bot.sendMessage(freeChatId, message, opts)
}

function sendPrivateMessage(message){
    if(!message) console.error('You need to provide a MESSAGE')
    bot.sendMessage(privateChatId, message, opts)
}

module.exports = {
    listeningBot,
    sendMessage,
    sendVipMessage,
    sendFreeMessage,
    sendTestMessage,
    sendPrivateMessage,
}