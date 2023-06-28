const express = require('express');
const usersRouter = express.Router();

const createNewUser = require("../db/users")


// TODO: REGISTER NEW USER HERE 

usersRouter.post('/register', async(req, res, next) => {

    //? how does this work?
    const {firstName, lastName, username, password} = req.body;

    try {
        //? this below checks if the username already exists
        // const _user = await getUserByUserName()
        const user = await createNewUser({
            firstName, 
            lastName, 
            username, 
            password
        })
        const token = jwt.sign({
            id: user.id,
            username,},
            process.env.JWT_SECRET,{expiresIn: '1w'}
            )
        res,send({
            message: "Thank you for joining the Bad Idea Cult."
        })


    } catch (error) {
        console.log("error registering new user", error)
    }

})