const express = require("express");
const reviewsRouter = express.Router();
const { fetchAllReviews } = require("../db/reviews");
const {createNewReviews, updateReviewById} = require("../db/reviews")
const {findReviewById} = require("../db/reviewFinder")


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

reviewsRouter.post("/singlePost", async (req, res)=>{
  const {id}= req.body

  res.send(await findReviewById(id))
})

reviewsRouter.patch("/editPost", async(req, res)=>{
  const {id, ideaName, title, author, review, rating}= req.body
  const fields = {}

  if (ideaName){
    fields.ideaName = ideaName
  }
  if (title){
    fields.title = title
  }
  if (author){
    fields.author = author
  }
  if (review){
    fields.review = review
  }
  if (rating){
    fields.rating = rating
  }
  const verification = findReviewById(id)
  if (!verification){
    return res.status(404).send({
      name: "404 - not found",
      message: "The route you are looking for does not exist",
  })}
  else{
updateReviewById(id, fields)
res.send({
  message: "review update was successful"
})
  }
})

module.exports = reviewsRouter;