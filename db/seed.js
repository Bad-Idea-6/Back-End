const client = require("./client");
const {buildOutTheDatabase} = require("./seedData");

// await buildOutTheDatabase().catch(console.error("error in seed data")).finally(()=>client.end())

async function theBigBang(){
    try {
        await buildOutTheDatabase()
        console.log("finished creating the database")
    } catch (error) {
        console.log("seed.js error", error)
    }
    client.end()
    console.log("made it past client end")
}
theBigBang()