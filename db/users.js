const client = require("./client")

async function createNewUser( {firstName, lastName, username, password, is_admin, email}){
try {
    const{rows} = await client.query(`
    INSERT INTO users( "firstName", "lastName", username, password, is_admin, email)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`
    ,[firstName, lastName, username, password, is_admin, email])
    console.log("user created")
    return rows
} catch (error) {
    console.error("createNewUser error in users.js", error)
}
}

module.exports = {createNewUser}