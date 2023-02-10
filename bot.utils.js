const User = require('./models/User')

async function getUserData(id){
    const response = await User.findOne(id)
    return response
}

async function saveUser(data){
    const newUser = new User(data)
    return await newUser.save()   
}

module.exports = {
    getUserData,
    saveUser
}