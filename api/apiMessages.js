const express = require("express");
const { route } = require("./apiReviews");
const { requireUser } = require("./apiUtils");
const router = express.Router();
const { createMessage, fetchAllMessages } = require("../db/messages")

router.post("/", requireUser, async (req, res) => {
    const { userId, userName } = req.user
    const { message, reviewId, rating, ideaName, title } = req.body
    try {
        console.log(message, reviewId, rating, ideaName, title)
        if(!ideaName || !title || !userName || !reviewId || !rating || !userId || !message){
            next({name: "Empty Field",
              message:  "Empty field please fill in all fields"})
          }
        const newMessage = createMessage({
            message,
            reviewId,
            userId,
            rating,
            ideaName,
            title,
            author: userName
        })
            res.send({message: "created new message"})
    } catch (error) {

    }
    res.send({ message: "random" })
})
router.get("/all-messages/:id", async (req, res)=>{
    const reviewId = req.params.id
    try {
        if(reviewId){
            const allComments = await fetchAllMessages()
            allComments.map((comment)=>{
                if(comment.reviewId = reviewId){
                    return comment
                }
            })
            console.log(allComments)
            res.send(allComments)
        }
        else{res.send({
            message:"No messages found"
        })}
    } catch (error) {
        console.log("error getting all messages", error)
    }
    
})

module.exports = router;