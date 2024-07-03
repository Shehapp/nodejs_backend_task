const bcrupt = require('bcrypt');
const {User} = require('../models');

const getUserByEmailService = async (email) => {
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    if(!user){
        throw {status: 404, message: 'User not found'};
    }
    return user;
}

const addUserService = async (req) => {

    var { email, password } = req.body;
    if (!email || !password) {
        throw {status: 400, message: 'Please fill in all fields'};
    }
    try{
      await getUserByEmailService(email);
    } catch (err) {

    password = await bcrupt.hash(password, 10);

  
    const user = await User.create({
        email: email,
        password: password
    });

    return user
}
throw {status: 409, message: 'User already exists'};

}

module.exports = {
    getUserByEmailService,
    addUserService
};