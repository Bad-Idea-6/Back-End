
const client = require("./index");


async function createTable(){
    try {
        await client.query(`
        CREATE TABLE reviews(
            "reviewId" SERIAL PRIMARY KEY,
            "ideaName" VARCHAR(225) NOT NULL, 
            title VARCHAR(225) NOT NULL,
            author VARCHAR(225) DEFAULT 'anonymous',
            review TEXT DEFAULT 'review TBD',
            rating INT NOT NULL 
        )
        `)
    } catch (error) {
        console.log("createTable error seed.js:5-20", error)
    }
}

async function theBigRedButtonOfDoom(){
    try {
        await client.query(`
        DROP TABLE IF EXISTS reviews
        `)
    } catch (error) {
        console.log("destroy table error seed.js:22-30", error)
    }
}

async function createNewReviews(reviewObj){
    try {
        const {rows} = await client.query(`
            INSERT INTO reviews("ideaName", title, author, review, rating)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`
            ,[reviewObj.ideaName, reviewObj.title, reviewObj.author, reviewObj.review, reviewObj.rating])
    } catch (error) {
        console.log(" error creating review seed.js:32-40", error )
    }

}

async function buildOutTheDatabase(){
    try {
        client.connect();

        await theBigRedButtonOfDoom();
        await createTable();

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


        client.end();
    } catch (error) {
        console.log(" buildOutTheDatabase error seed.js:end", error)
    }

}

buildOutTheDatabase()