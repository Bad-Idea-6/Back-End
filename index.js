const express require("express");

const app = express();

const {createNewReviews, fetchAllReviews, fetchReviewById, updateReviewById,deleteReviewById} = require("./db/seed")

function myFirstMiddleware(req, res, next) {
    console.log("We have received a request")
    console.log("Now we will respond")
    next(); 
 }
 app.use(myFirstMiddleware)
 
 app.use(express.json());


async function getAllBooks(req, res, next) {
    try {
        const theActualBookData = await fetchAllBooks(); 

        if (theActualBookData.length) {
            res.send(theActualBookData)
        } else {
            res.send("No books available...")
        }
    } catch (error) {
        console.log(error); 
    }
}
app.get("/books", getAllBooks)
















 const client = require("./db/index")
 client.connect();

 app.listen(3000, () => {
    console.log("We are now connected to port 3000.")
})
