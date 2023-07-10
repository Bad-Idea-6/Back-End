const bcrypt = require("bcrypt");

async function passwordHasher(passwordToBeHashed){
    const saltRound = await bcrypt.genSalt(8)
    const myHashedPassword = await bcrypt.hash(passwordToBeHashed, saltRound)
return myHashedPassword

}

module.exports = passwordHasher