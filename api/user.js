const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");

const { createNewUser } = require("../db/users");
const { findUserByUsername } = require("../db/userFinder");

// TODO: REGISTER NEW USER HERE

usersRouter.post("/register", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  
  try {
    //? this below checks if the username already exists
    const _user = await findUserByUsername(username)
  if (!_user){  
    const user = await createNewUser({
      firstName,
      lastName,
      username,
      password
    });
    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1w" }
    );
    res.send({
      message: "Thank you for joining the Bad Idea Cult.",
      token,
    });}
    else{
      res.send("username already un use. please try again ")
    }
  } catch (error) {
    console.log("error registering new user", error);
  }
});


// TODO: LOGIN AN EXISTING USER
usersRouter.get("/login", async (req, res) => {
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
                    {expiresIn: "1w"}
            
        )

      res.send({
        message: "you have logged in!!!",
        token,
      });
    }
  } catch (error) {
    console.log("error during login sequence api/user.js", error);
  }
});

module.exports = usersRouter;
