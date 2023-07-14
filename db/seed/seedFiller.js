const { createNewReviews, fetchAllReviews, fetchReviewById, updateReviewById, deleteReviewById } = require("../reviews");
const { createNewUser } = require("../users")
const {createMessage} = require("../messages")
const passwordHasher = require("../passwordHasher")

async function fillTheDatabase(){

    console.log("started to fill the database")
try {

   // ! CREATING REVIEWS

   //TODO LETS BEEF UP THE REVIEWS AND GET 10 

    const firstReview = await createNewReviews({
        "ideaName": "skinny-dipping at the local rec center ",
        title: "don't swim in a public pool naked",
        author: "person",
        review: "everyone's children where traumatized because i hadn't worked on my bakini bod",
        rating: 3,
        "imgURL": 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg'
    })
    const secondReview = await createNewReviews({
        "ideaName": "skinny-dipping at the local rec center ",
        title: "don't swim in a public pool naked",
        author: "person",
        review: "everyone's children where traumatized because i hadn't worked on my bakini bod",
        rating: 3,
        "imgURL": 'https://techcrunch.com/wp-content/uploads/2022/06/Weird-Stock-Photography-Haje-Kamps-websize.jpeg'
    })
    const thirdReview = await createNewReviews({
        "ideaName": "skinny-dipping at the local rec center ",
        title: "don't swim in a public pool naked",
        author: "person",
        review: "everyone's children where traumatized because i hadn't worked on my bakini bod",
        rating: 3,
        "imgURL": 'https://i.chzbgr.com/full/7443596800/h2494D3CE/this-might-not-be-such-a-great-idea'
    })
    console.log(" got through the reviews ")
    
    //! CREATING USERS

    //TODO LET CREATE MORE USERS MAYBE 5

    const firstUser = await createNewUser({
        firstName: "aldolfo",
        lastName: "freddy",
        username: "aldofreddy",
        password: await passwordHasher("password1")
    })

    const firstUser1 = await createNewUser({
        firstName: "Dave",
        lastName: "freddy",
        username: "angryDave",
        password: await passwordHasher("password1")
    })
    const firstUser2 = await createNewUser({
        firstName: "Nick",
        lastName: "freddy",
        username: "lil_nick",
        password: await passwordHasher("password1")
    })

    console.log("got through the users")

    //! REVIEW COMMENTS 

    //TODO THERE NEEDS TO BE 2 COMMENTS FOR EVERY ONE POST

    const firstMessage = await createMessage({
        message:"admin", 
        title: "password", 
        author: "yyyy",
        reviewId: 1,
        rating: 2,
        userId: 3
    })

    console.log("got through comments")


} catch (error) {
    console.log("error filling the database with data /db/seed/seedFiller.js", error)
}

}

module.exports = {fillTheDatabase}