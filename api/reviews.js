const express = require("express");
const reviewsRouter = express.Router();
const { fetchAllReviews } = require("../db/reviews");
const {createNewReviews} = require("../db/reviews")

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
  console.log(" entered into reviews Router", req)
  const token = req
  console.log(token) 
  const {ideaName, title, author, review, rating} = req.body
  try {
 const newReview = createNewReviews({
  ideaName, 
  title, 
  author, 
  review,
   rating
  })
res.send({
  message: "you posted something successfully"
})
  
} catch (error) {
  console.log("error posting to the Reviews table", error)
}


})

module.exports = reviewsRouter;