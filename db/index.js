// connect to the postgres object inside of Node_Modules
const pg = require("pg");

const client = new pg.Client("postgres://localhost:5432/bad_idea");

module.exports = client;