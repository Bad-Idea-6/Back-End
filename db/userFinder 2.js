const client = require("./client")


//? this function need to go through the database by the username then gives us al reletive data conected to the user.

async function findUserByUsername (userNameValue){
    try {
        const {rows} = await client.query(`
            SELECT FROM username
            WHERE username = ${userNameValue};
        `)
        return rows
    } catch (error) {
        console.log("userFinder ERROR", error)
    }
}

module.exports ={findUserByUsername}