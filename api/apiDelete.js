const express = require("express");
const { requireUser } = require("./apiUtils");
const deleteRouter = express.Router();
const {deleteReviewById, deleteUserById, deleteCommentById} = require("../db/delete")


deleteRouter.delete("/review", requireUser, async (req, res, next)=>{
    // ? check if review id belongs to user or user is admin 
    const {is_admin, userId} = req.user
    const {reviewOwnerId, reviewId} = req.body
    try {
        if (userId === reviewOwnerId || is_admin){
            deleteReviewById(reviewId)
            res.send({
                message: "you have successfully deleted a post"
            })
        } else{
            res.send({
                error: 401-"unauthorized",
                message: "you do not have clearance to delete this review"
            })
        }
    } catch (error) {
        next(error);
    }
})
deleteRouter.delete("/comment", requireUser, async (req, res, next)=>{
    // ? check if review id belongs to user or user is admin 
    const {is_admin, userId} = req.user
    const {messageOwnerId, messageId} = req.body
    try {
        if (userId === messageOwnerId || is_admin){
            console.log("you enetered into the abyss")
            deleteCommentById(messageId)
            res.send({
                message: "you have successfully deleted a comment"
            })
        } else{
            res.send({
                error: 401-"unauthorized",
                message: "you do not have clearance to delete this comment"
            })
        }
    } catch (error) {
        next(error);
    }
})
deleteRouter.delete("/user", requireUser, async (req, res, next)=>{
    // ? check if userToBeDeleted'sId belongs to the user or user is admin 
    const {is_admin, userId} = req.user
    const {userInQuestionId} = req.body
    console.log(userInQuestionId, "35135410358410")
    try {
        if (userId === userInQuestionId || is_admin){
            (console.log("you can totaly delete this person"))
            deleteUserById(userInQuestionId)
            res.send({
                message: "you have successfully deleted a person"
            })
        } else{
            console.log("dont you date try and delete this")
            res.send({
                error: 401-"unauthorized",
                message: "you do not have clearance to delete this person"
            })
        }
    } catch (error) {
        next(error);
    }
})

module.exports = deleteRouter