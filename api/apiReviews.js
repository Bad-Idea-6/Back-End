const express = require("express");
const reviewsRouter = express.Router();
const { fetchAllReviews } = require("../db/reviews");
const {createNewReviews, updateReviewById, reportReview, resolveReport} = require("../db/reviews")
const {findReviewById} = require("../db/reviewFinder");
const { requireUser } = require("./apiUtils");


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
    next(error);
  }
});

reviewsRouter.post("/post", requireUser, async (req, res)=>{
  const {ideaName, title, author, review, rating, imgURL} = req.body
   try {
    if(!ideaName || !title || !author || !review || !rating || !imgURL){
      next({name: "Empty Field",
        message:  "Empty field please fill in all fields"})
    }
 const newReview = await createNewReviews({
  ideaName, 
  title, 
  author, 
  review,
   rating,
   imgURL
  })
res.send({
 newReview
})
  
} catch (error) {
  console.log("error posting to the Reviews table", error)
}


})

reviewsRouter.post("/singlePost", async (req, res)=>{
  const {id}= req.body

  res.send(await findReviewById(id))
})

reviewsRouter.patch("/editPost", requireUser, async(req, res)=>{
  console.log("made it into the patch request")
  const {id, ideaName, title, author, review, rating}= req.body
  const fields = {}
  console.log( id,"saedrfxghdfdghdgfhsa")
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


//? REPORTING TOOLS


reviewsRouter.post("/report", requireUser, async (req, res, next)=>{
  const {userId} = req.user
  const {reviewId} = req.body
  try {
    if (userId && reviewId) {
      reportReview(reviewId)
      res.send({
        message: "An admin will review this report shortly"
      })
    }
    else{
      res.send({
        message: "Missing information, could not report post at this time"
      })
    }
  } catch (error) {
    next(error)
  }
})
reviewsRouter.post("/admin-resolve-report", requireUser, async (req, res, next)=>{
  const {is_admin} = req.user
  const {reviewId} = req.body
  try {
    if (is_admin && reviewId) {
      resolveReport(reviewId)
      res.send({
        message: "An admin will review this report shortly"
      })
    }
    else{
      res.send({
        message: "Missing information, could not report post at this time"
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = reviewsRouter;