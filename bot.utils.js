const User = require('./models/User')

async function getUserData(id){
    if(!id) console.error('You must provide an ID');
    const user = { userId: id}
    const response = await User.findOne(user)
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