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
        const userId = msg.from.id
        const userName = msg.from.first_name
        if(msg.text === '/info'){
            sendMessage(chatId, `Bueno, me presento, soy *Jumbot*, un bot desarrollado para mostrarte las mejores ofertas de Jumbo 🥸.\nHe creado dos canales de difusion para esto, *uno gratuito 🤩 y otro de pago 🤫*.\n\nEn mi *canal gratuito* enviare todas la ofertas que encuentre, *una vez al dia*. Con los precios actualizados hasta ese momento.\nEn el *canal VIP* 😎, es donde ocurre la magia, la suscripcion VIP, te da acceso al canal VIP, obviamente _dah 🫠_, ahi se publicaran los *productos en promocion y actualizando los precios cada hora.*\n\nAdemas de eso, todos los *usuarios VIP*, los tengo guardados en mi agenda, y apenas encuentre un cambio de precio *desde 50% de descuento o mas*, les notificare directamente en su chat 😏.\n\n_Nota: Mi creador dice que no se quiere hacer rico 🙄, bueno si, pero no 'robandoles' 🤷🏽‍♂️ , solo necesita el dinero para poder seguir con el proyecto, ya saben pagar servidor y apps y todo eso, cosas que yo no entiendo... Ni que fuera un robot... 🤖 _`)
        }
        if(msg.text === '/free'){
        sendMessage(chatId, `${userName}, puedes entrar al canal con el siguiente enlace! 😄\nhttps://t.me/+RGByI7679pAxZGQx \n*Nota:* _No compartas este enlace, quien quiera ingresar debe solicitarmelo a mi para aceptarlo/a  jeje! 😳_`)
        }
        if(msg.text === '/vip'){        
            sendMessage(chatId, `${userName}, lamentamos decirte que nuestra funcionalidad VIP, aun no esta disponible 😓\nLos desarrolladores se encuentran un poco lentos 🙄, no les digas que yo dije eso jeje 🤪 \nPero en cuanto este disponible te notificare!! ya te guarde en mis contactos como '${userName} ❤️' 🤭, no me silencies mis notificaciones eh... 😡`)
        }

    })
    bot.on('chat_join_request', req => {
        if(req.invite_link.creator.is_bot === true) bot.declineChatJoinRequest(req.chat.id, req.from.id)
        console.log(req);
    })

}

function sendMessage(id, message){
    bot.sendMessage(id, message, opts)
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