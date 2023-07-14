const client = require("./client")

async function createNewReviews(reviewObj){
    try {
        const {rows} = await client.query(`
            INSERT INTO reviews("ideaName", title, author, review, rating, "imgURL")
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;`
            ,[reviewObj.ideaName, reviewObj.title, reviewObj.author, reviewObj.review, reviewObj.rating, reviewObj.imgURL])
            return rows[0]
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

async function updateReviewById(id, fields){
    const arrayOfKeys = Object.keys(fields);
    const mapOfSetStringNames = arrayOfKeys.map((key, index) => {
      return `"${key}"=$${index + 1}`;
    });
    const setString = mapOfSetStringNames.join(", ");
    if (setString.length === 0) {
      return;
    }
  try {
    const { rows } = await client.query(`
    UPDATE reviews
    SET ${setString}
    WHERE "reviewId" = ${id}
    RETURNING *;`,Object.values(fields));
    return rows[0];
  } catch (error) {
    console.log("done did screwed updid", error);
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

async function reportReview(idValue){
    try {
        const {rows} = await client.query(`
        UPDATE reviews
        SET reported = true
        WHERE "reviewId" = $1
        RETURNING*;
        `, [idValue])
            return (rows[0])
    } catch (error) {
        console.log(error)
    }
}
async function resolveReport(idValue){
    try {
        const {rows} = await client.query(`
        UPDATE reviews
        SET reported = false
        WHERE "reviewId" = $1
        RETURNING*;
        `, [idValue])
            return (rows[0])
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createNewReviews, fetchAllReviews, fetchReviewById, updateReviewById,deleteReviewById, reportReview, resolveReport}