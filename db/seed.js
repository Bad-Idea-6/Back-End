const client = require("./client");
const {buildOutTheDatabase} = require("./seedData");

buildOutTheDatabase().catch(console.error).finally(()=>client.end())