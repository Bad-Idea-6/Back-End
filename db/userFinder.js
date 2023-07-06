const client = require("./client");

//? this function need to go through the database by the username then gives us al reletive data conected to the user.

async function findUserByUsername(userNameValue) {
  try {
    const { rows } = await client.query(
      `
            SELECT * FROM users
            WHERE "username" = $1;
        `,
      [userNameValue]
    );

    return rows[0];
  } catch (error) {
    console.log("userFinderByUsername ERROR", error);
  }
}
async function findUserById(idValue) {
  try {
    const { rows } = await client.query(
      `
            SELECT * FROM users
            WHERE "id" = $1;
        `,
      [idValue]
    );

    return rows[0];
  } catch (error) {
    console.log("userFinderById ERROR", error);
  }
}

module.exports = { findUserByUsername, findUserById };
