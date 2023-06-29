const express = require('express')
const router = express.Router()

router.get('/health', (request, response)=>{
  response.send('I am up and healthy')
})

router.use('/reviews', require('./reviews'))
router.use('/user', require('./user'))



module.exports = router