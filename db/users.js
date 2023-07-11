const client = require("./client");

async function createNewUser({
  firstName,
  lastName,
  username,
  password,
  is_admin,
  email,
}) {
  try {

console.log(typeof is_admin, "is admin??????")
    if (is_admin!== true && is_admin !== false){
        is_admin = false
    }


    const { rows } = await client.query(
      `
    INSERT INTO users( "firstName", "lastName", username, password, is_admin, email)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`,
      [firstName, lastName, username, password, is_admin, email]
    );
    console.log("user created");
    return rows;
  } catch (error) {
    console.error("createNewUser error in users.js", error);
  }
}

async function updateUser(id, fields) {
    const arrayOfKeys = Object.keys(fields);
    console.log(arrayOfKeys)
    const mapOfSetStringNames = arrayOfKeys.map((key, index) => {
      return `"${key}"=$${index + 1}`;
    });
    console.log(mapOfSetStringNames)
    const setString = mapOfSetStringNames.join(", ");
console.log(setString)
    if (setString.length === 0) {
      return;
    }
  try {
    const { rows } = await client.query(`
    UPDATE users
    SET ${setString}
    WHERE "userId" = ${id}
    RETURNING *;`,Object.values(fields));
    console.log(rows[0], "!!!!!!!")
    return rows[0];
  } catch (error) {
    console.log("done did screwed updid", error);
  }
}
module.exports = { createNewUser, updateUser };
