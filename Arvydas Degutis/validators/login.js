const {body} = require('express-validator');
const argon2 = require('argon2');
const { getUser } = require('../models/userModel');

const validateLogin = [
body('username')
.notEmpty()
.withMessage("Username is required"),

body('password')
.notEmpty()
.withMessage('password is required')
.custom(async(value, {req})=>{
    const existingUser = await getUser(req.body.username);

    if (existingUser){
        const match = await argon2.verify(existingUser.password, value);
        if (!match){
            throw new Error ('Password is incorect');

        } 
        return true;
     } else {
            throw new Error('user not found, please sing up ')
        }


}),

];

module.exports = validateLogin

