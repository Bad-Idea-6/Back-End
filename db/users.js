const client = require("./client")

async function createNewUser( {firstName, lastName, username, password}){
try {
    const{rows} = client.query(`
    INSERT INTO users( "firstName", "lastName", username, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`
    ,[firstName, lastName, username, password])
    console.log("user created")
    return rows
} catch (error) {
    console.error("createNewUser error in users.js", error)
}
}

module.exports = {createNewUser}