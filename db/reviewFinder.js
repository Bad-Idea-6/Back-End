const client = require("./client");

async function findReviewById(idValue) {
    try {
      const { rows } = await client.query(
        `
              SELECT * FROM reviews
              WHERE "reviewId" = $1;
          `,
        [idValue]
      );
  
      return rows[0];
    } catch (error) {
      console.log("findReviewById in reviewFinder.js ERROR", error);
    }
  }

module.exports ={findReviewById}