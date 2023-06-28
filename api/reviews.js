const express = require("express");
const reviewsRouter = express.Router();
const { fetchAllReviews } = require("../db/reviews");

reviewsRouter.get("/", async (request, response) => {
  try {
    const allReviews = await fetchAllReviews();

    if (allReviews && allReviews.length) {
      allReviews.forEach((e) => {
        delete e.password;
      });
      response.send(allReviews);
    } else {
      response.send("No reviews were found");
    }
  } catch (error) {
    throw error;
  }
});

reviewsRouter.post("/post", async (req, res)=>{
  consol.log(" entered into reviews Router", req)
try {
  const {rows} = await client.query(`
  INSERT INTO reviews("ideaName", title, author, review, rating)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`
  ,[reviewObj.ideaName, reviewObj.title, reviewObj.author, reviewObj.review, reviewObj.rating])

  return rows
  
} catch (error) {
  console.log("error posting to the Reviews table", error)
}


})

module.exports = reviewsRouter;