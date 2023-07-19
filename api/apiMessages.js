const express = require("express");
const { route } = require("./apiReviews");
const { requireUser } = require("./apiUtils");
const router = express.Router();
const { createMessage, fetchAllMessages } = require("../db/messages");

router.post("/leave-comment", async (req, res, next) => {
  console.log("hello darknbess may");
  console.log(req.body, "asidubfadib");
  const { userId, username } = req.user;
  const { message, reviewId, rating, ideaName, title } = req.body;
  try {
    console.log(message, reviewId, rating, ideaName, title);
    console.log(userId, req.user);
    if (
      !ideaName ||
      !title ||
      !username||
      !reviewId ||
      !rating ||
      !userId||
      !message
    ) {
      next({
        name: "Empty Field",
        message: "Empty field please fill in all fields",
      });
    }
    const newMessage = await createMessage({
      message,
      reviewId,
      userId,
      rating,
      ideaName,
      title,
      author: username,
    });
    res.send({ message: "created new message" });
  } catch (error) {
    next(error);
  }
});
router.get("/all-messages/:id", async (req, res)=>{
    const reviewId = req.params.id
    try {
        if(reviewId){
            const totalComments = [];
            const allComments = await fetchAllMessages()
            allComments.map((comment)=>{
                if(comment.reviewId == reviewId){
                    totalComments.push(comment)
                }
            })
            console.log(totalComments)
            res.send(totalComments)
    } else {
      res.send({
        message: "No messages found",
      });
    }
  } catch (error) {
    console.log("error getting all messages", error);
  }
});

module.exports = router;
