const client = require("./client")

async function createMessage(
    {message,
    reviewId,
    userId,
    rating,
    title,
    author}
){
    try {
        const {rows} = await client.query(`
            INSERT INTO messages(message, "reviewId", "userId", rating, title, author)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;`
            ,[message, reviewId, userId, rating, title, author])
            return rows[0]
    } catch (error) {
        console.log("Create Message error", error)
    }


}

module.exports = {createMessage}