const { getUserByEmail, addUser} = require('../models/auth_model');
const bcrupt = require('bcrypt');

const getUserByEmailService = async (email) => {
    const user = await getUserByEmail(email);
    if(user.length === 0){
        throw {status: 404, message: 'User not found'};
    }
    return user;
}

const addUserService = async (req) => {
    const { email, password } = req.body;
    const values = [email, password];

    if (!email || !password) {
        throw {status: 400, message: 'Please fill in all fields'};
    }
    try{
       const userExists = await getUserByEmail(email);
    } catch (err) {

    values[1] = await bcrupt.hash(password, 10)
    const user = await addUser(values);
    return user;
}
throw {status: 409, message: 'User already exists'};

}

module.exports = {
    getUserByEmailService,
    addUserService
};