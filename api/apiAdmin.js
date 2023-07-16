const express = require("express");
const adminRouter = express.Router();
const {getAllUsers, createAdmin} = require("../db/users")
const {resolveReport} = require("../db/reviews")

adminRouter.get("/all-users", async (_, res)=>{
try {
    const everyone = await getAllUsers()

    console.log("entered into all-users")
    res.send(everyone)
} catch (error) {
    console.log("ERROR GETTING ALL USERS", error)
}
})

adminRouter.patch("/make-admin", async (req, res, next)=>{
    const {adminId} = req.body
    console.log("things are going down", adminId)
    try {
        await createAdmin(adminId)

        res.send({
            messages:"you have successfully created a new admin"
        })
    } catch (error) {
        next(error)
    }
})

adminRouter.patch("/resolve-report", async (req, res, next)=>{
    const {reviewId} = req.body
    try {
        await resolveReport(reviewId)

        res.send({
            messeges: "you resolved a report"
        })
        
    } catch (error) {
        
    }
})

module.exports = adminRouter