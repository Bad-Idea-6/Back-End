
const client = require("./client");
require('dotenv').config();

const{createNewReviews, fetchAllReviews, fetchReviewById, updateReviewById,deleteReviewById} = require("./reviews");
const {createNewUser} = require("./users")
async function createTableReviews(){
    try {
        await client.query(`
        CREATE TABLE reviews(
            "reviewId" SERIAL PRIMARY KEY,
            "ideaName" VARCHAR(225) NOT NULL, 
            title VARCHAR(225) NOT NULL,
            author VARCHAR(225) DEFAULT 'anonymous',
            review TEXT DEFAULT 'review TBD',
            rating INT NOT NULL 
        );
        `)
    } catch (error) {
        console.log("createTableReviews error seed.js", error)
    }
}
async function dropUserTable(){
    try {
        console.log("starting to drop tables")
            await client.query(`
            DROP TABLE IF EXISTS users;
            `)
        console.log("finished droping tables")
    } catch (error) {
        
    }
}
async function createTableUsers(){
    console.log("started creating users table")
    try {
        await client.query(`
        CREATE TABLE users(
            "userId" SERIAL PRIMARY KEY,
            "firstName" VARCHAR(255) NOT NULL,
            "lastName" VARCHAR(225) NOT NULL,
            username VARCHAR(255) NOT NULL UNIQUE,
            "password" VARCHAR(15) NOT NULL,
            email VARCHAR(225),
            "is_admin" BOOLEAN 
        );
        `)
        console.log("finished creating users table")
    } catch (error) {
        console.log("error creating user table seed.js", error)
    }
}

async function theBigRedButtonOfDoom(){
    try {
        await client.query(`
        DROP TABLE IF EXISTS reviews;
        `)
    } catch (error) {
        console.log("destroy table error seed.js:22-30", error)
    }
}



async function buildOutTheDatabase(){
    try {
        client.connect();

        await dropUserTable()
        await theBigRedButtonOfDoom();
        await createTableReviews();
        await createTableUsers()

        console.log(" got to the seed data")

        // ALL OF THE SEED DATA
        const firstReview = await createNewReviews({
            "ideaName": "skinny-dipping at the local rec center ",
            title: "don't swim in a public pool naked",
            author: "person",
            review: "everyone's children where traumatized because i hadn't worked on my bakini bod",
            rating: 3
        })
        const secondReview = await createNewReviews({
            "ideaName": "skinny-dipping at the local rec center ",
            title: "don't swim in a public pool naked",
            author: "person",
            review: "everyone's children where traumatized because i hadn't worked on my bakini bod",
            rating: 3
        })
        const thirdReview = await createNewReviews({
            "ideaName": "skinny-dipping at the local rec center ",
            title: "don't swim in a public pool naked",
            author: "person",
            review: "everyone's children where traumatized because i hadn't worked on my bakini bod",
            rating: 3
        })
        console.log(" got through the reviews ")
            // USER SEED DATA
            const [firstName, lastName, username, password, is_admin] = process.env.admin.split(",")
            console.log(firstName, lastName, username, password, is_admin, "@@@@@")
            const admin = await createNewUser({firstName, lastName, username, password, is_admin})
            
            const firstUser = await createNewUser({
                firstName: "aldolfo",
                lastName: "freddy",
                username: "aldofreddy",
                password: "password1"
            })
            
            console.log(firstUser)
            const firstUser1 = await createNewUser({
                firstName: "aldolfo",
                lastName: "freddy",
                username: "aldofreddy1",
                password: "password1"
            })
            const firstUser2 = await createNewUser({
                firstName: "aldolfo",
                lastName: "freddy",
                username: "aldofreddy2",
                password: "password1"
            })
            console.log("got through the users")
      
    } catch (error) {
        console.log(" buildOutTheDatabase error seedData.js:end", error)
    }

}





module.exports = {buildOutTheDatabase}