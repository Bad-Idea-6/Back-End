const client = require("./client")

async function createNewReviews(reviewObj){
    try {
        const {rows} = await client.query(`
            INSERT INTO reviews("ideaName", title, author, review, rating)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`
            ,[reviewObj.ideaName, reviewObj.title, reviewObj.author, reviewObj.review, reviewObj.rating])

            return rows
    } catch (error) {
        console.log(" error creating review", error )
    }

}

async function fetchAllReviews(){
    try{
        const {rows} = await client.query(`
        SELECT * FROM reviews
        ;
        `)
        return rows
    } catch (error){
        console.log(error, "Fetch all from reviews")
    }
}

async function fetchReviewById(reviewIdValue){
    try{
        const {rows} = await client.query(`
        SELECT * FROM reviews
        WHERE "reviewId" = ${reviewIdValue}
        ;
        `)
    } catch (error){
        console.log(error, "Fetch review by ID")
    }
}

async function updateReviewById(title, ideaName, review, rating){
    try{
        const {rows} = await client.query(`
        UPDATE reviews
        SET title = $1
        SET ideaName = $2
        SET review = $3
        SET rating = $4
        ;
        `,[title, ideaName, review, rating])
            if (rows.length){
                return rows[0];
            }
    } catch (error){
        console.log(error, "update Review by Id")
    }
}

async function deleteReviewById(reviewIdValue){
try {
    const {rows} = await client.query(`
        DELETE FROM reviews
        WHERE "reviewId" = ${reviewIdValue}
        RETURNING *
        ;
    `)
        if(rows.length){
            return rows[0]
        } 
        else {
            return "Failed to delete review."
        }
} catch (error) {
    console.log(error, "Delete Review by ID")
}
}

module.exports = { createNewReviews, fetchAllReviews, fetchReviewById, updateReviewById,deleteReviewById}