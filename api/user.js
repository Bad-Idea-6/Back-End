const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");

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
      const user = await createNewUser({
        firstName,
        lastName,
        username,
        password,
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
      testedUsername.password == password
    ) {
      const token = jwt.sign(
        {
          id: testedUsername.id,
          username
        },

        process.env.JWT_SECRET,
        { expiresIn: "1w" }

      )

      res.send({
        message: "you have logged in!!!",
        token, success: true,
        id:testedUsername.userId
      });
    }
    else {
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
  console.log("entered into profile")
  try {
    console.log(id)
    const {id} = req.body;
    const user = findUserById(id)
    console.log(user)
    if (user){
      console.log("well that worked ish???")
      res.send(
        user
      )
    }


  } catch (error) {
    
  }
})

module.exports = usersRouter;
