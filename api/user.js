const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { createNewUser } = require("../db/users");
const { findUserByUsername, findUserById } = require("../db/userFinder");

// TODO: REGISTER NEW USER HERE

usersRouter.post("/register", async (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;
  console.log(req.body, "34234234234234234")
  try {
    //? this below checks if the username already exists
    const _user = await findUserByUsername(username)
    if (!_user) {
      const saltRound = await bcrypt.genSalt(8)
      const myHashedPassword = await bcrypt.hash(password, saltRound)
      console.log(myHashedPassword, "myhashedpassword")
      const user = await createNewUser({
        firstName,
        lastName,
        username,
        password: myHashedPassword,
        email
      });

      const token = jwt.sign(
        {
          username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({
        message: "Thank you for joining the Bad Idea Cult.",
        token,
      });
    }
    else {
      res.send("username already un use. please try again ")
    }
  } catch (error) {
    console.log("error registering new user", error);
  }
});


// TODO: LOGIN AN EXISTING USER
usersRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const testedUsername = await findUserByUsername(username);
    // console.log("test 2",testedUsername)
    if (
      testedUsername.username == username &&
      bcrypt.compare(password, testedUsername.password)
    ) {
      const token = jwt.sign(
        {
          id: testedUsername.id,
          username
        },

        process.env.JWT_SECRET,
        { expiresIn: "1w" }

      )
console.log("you made it here! line 70")
      res.send({
        message: "you have logged in!!!",
        token, success: true,
        id:testedUsername.userId,
        is_admin: testedUsername.is_admin
      });
    }
    else {
      console.log("line 78")
      res.send({
        message: "you have NOT logged in!!!",
        token: null, success: false
      });

    }
  } catch (error) {
    console.log("error during login sequence api/user.js", error);
  }
});

usersRouter.post("/profile", async(req, res)=>{
  try {
    const {id} = req.body;
    const user = await findUserById(id)
    console.log(user)
    if (user){
      res.send(
        user
      )
    }


  } catch (error) {
    
  }
})

module.exports = usersRouter;
