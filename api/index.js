const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const {findUserById} = require("../db/userFinder");
const { requireUser } = require('./apiUtils');

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    console.log("no auth")
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
console.log("line 13")
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Our user Id:-----", id);
      if (id) {
        req.user = await findUserById(id);
        console.log(req.user, "line 21")
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

router.get('/health', (request, response)=>{
  response.send('I am up and healthy')
})

router.use('/reviews', require('./apiReviews'))
router.use('/user', require('./apiUser'))
router.use('/messages', require("./apiMessages"))



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