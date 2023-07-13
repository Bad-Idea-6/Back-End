const passwordHasher = require("./passwordHasher");
const client = require("./client");
require('dotenv').config();

const { createNewReviews, fetchAllReviews, fetchReviewById, updateReviewById, deleteReviewById } = require("./reviews");
const { createNewUser } = require("./users")
const {createMessage} = require("./messages")
async function createTableReviews() {
    try {
        await client.query(`
        CREATE TABLE reviews(
            "reviewId" SERIAL PRIMARY KEY,
            "ideaName" VARCHAR(225) NOT NULL, 
            title VARCHAR(225) NOT NULL,
            author VARCHAR(225) DEFAULT 'anonymous',
            review TEXT DEFAULT 'review TBD',
            "imgURL" TEXT DEFAULT 'https://2.bp.blogspot.com/_4Buev2eybnY/S4fYsbTHigI/AAAAAAAAGrk/5GqA1kKMPC4/s280/hot+dog+news.jpg',
            rating INT NOT NULL 
        );
        `)
    } catch (error) {
        console.log("createTableReviews error seed.js", error)
    }
}

async function createMessageTable() {
    try {
        await client.query(`
    CREATE TABLE messages(
        "messageId" SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        "reviewId" INT NOT NULL,
        "userId" INT NOT NULL,
        rating INT NOT NULL,
        title VARCHAR(225) NOT NULL,
        author VARCHAR(225) NOT NULL
    );
 `)
    } catch (error) {
console.error(error)
    }

}

async function dropUserTable() {
    try {
        console.log("starting to drop tables")
        await client.query(`
            DROP TABLE IF EXISTS users;
            `)
        console.log("finished droping tables")
    } catch (error) {

    }
}
async function dropMessageTable() {
    try {
       
        await client.query(`
            DROP TABLE IF EXISTS messages;
            `)
   
    } catch (error) {

    }
}
async function createTableUsers() {
    console.log("started creating users table")
    try {
        await client.query(`
        CREATE TABLE users(
            "userId" SERIAL PRIMARY KEY,
            "firstName" VARCHAR(255) NOT NULL,
            "lastName" VARCHAR(225) NOT NULL,
            username VARCHAR(255) NOT NULL UNIQUE,
            "password" VARCHAR(255) NOT NULL,
            email VARCHAR(225),
            "is_admin" BOOLEAN DEFAULT false
        );
        `)
        console.log("finished creating users table")
    } catch (error) {
        console.log("error creating user table seed.js", error)
    }
}

async function theBigRedButtonOfDoom() {
    try {
        await client.query(`
        DROP TABLE IF EXISTS reviews;
        `)
    } catch (error) {
        console.log("destroy table error seed.js:22-30", error)
    }
}



async function buildOutTheDatabase() {
    try {
        client.connect();

        await dropUserTable();
        await dropMessageTable();
        await theBigRedButtonOfDoom();
        await createTableReviews();
        await createTableUsers();
        await createMessageTable();

        console.log(" got to the seed data")

        // ALL OF THE SEED DATA
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
        // USER SEED DATA
        const [firstName, lastName, username, password, is_admin = true] = process.env.admin.split(",")
        console.log(firstName, lastName, username, password, is_admin, "@@@@@")
        const admin = await createNewUser({ firstName, lastName, username, password: await passwordHasher(password), is_admin })
        console.log(await passwordHasher("password"), "yeahhhhh")
        const firstUser = await createNewUser({
            firstName: "aldolfo",
            lastName: "freddy",
            username: "aldofreddy",
            password: await passwordHasher("password1")
        })

        console.log(firstUser)
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
        
       
        const firstMessage = await createMessage({
            message:"admin", 
            title: "password", 
            author: "yyyy",
            reviewId: 1,
            rating: 2,
            userId: 3
        })
    } catch (error) {
        console.log(" buildOutTheDatabase error seedData.js:end", error)
    }

}





module.exports = { buildOutTheDatabase }