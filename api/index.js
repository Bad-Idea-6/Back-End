const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const {findUserById} = require("../db/userFinder");
const { requireUser, requireAdmin } = require('./apiUtils');

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  //TODO: AUTHORIZE THE USER 
  // this creates a req.user object from the token (if present) to be pulled from the req element

  if (!auth) {
    console.log("no auth")
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      if (id) {
        req.user = await findUserById(id);
        next();
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// ! ROUTE TO CHECK THE API IS CONNECTED 

router.get('/health', (request, response)=>{
  response.send('I am up and healthy')
})

  // TODO: routes to the different api components

router.use('/reviews', require('./apiReviews'))
router.use('/user', require('./apiUser'))
router.use('/messages', require("./apiMessages"))
router.use('/delete', require("./apiDelete"))
router.use('/admin',requireAdmin, require("./apiAdmin"))



//todo 404 handler
router.get("*", (_, res) => {
  res.status(404).send({
    name: "404 - not found",
    message: "The route you are looking for does not exist",
  });
});

router.use((error, req, res, next) => {
  console.log("server error: ", error);

  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = router