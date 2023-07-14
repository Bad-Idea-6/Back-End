const passwordHasher = require("../passwordHasher");
const client = require("../client");
require('dotenv').config();

const { createNewReviews, fetchAllReviews, fetchReviewById, updateReviewById, deleteReviewById } = require("../reviews");
const { createNewUser } = require("../users")
const {createMessage} = require("../messages")
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

        console.log(" MADE AND DROPPED ALL OF THE TABLES")
        
        // CREATE ADMIN 
        const [firstName, lastName, username, password, is_admin = true] = process.env.admin.split(",")
        const admin = await createNewUser({ firstName, lastName, username, password: await passwordHasher(password), is_admin })
    } catch (error) {
        console.log(" buildOutTheDatabase error seedData.js:end", error)
    }

}





module.exports = { buildOutTheDatabase }