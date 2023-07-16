const client = require("./client")

async function deleteUserById(idValue){
    try {
        const { rows } = await client.query(
            `
                  DELETE FROM users
                  WHERE "userId" = $1;
              `,
            [idValue]
          );
      
          return rows[0];
    } catch (error) {
        console.log("ERROR DELETING REVIEW BY ID db/delete.js", error)
    }
}

function deleteUserByUsername(){}

async function deleteReviewById(idValue){

        try {
            const { rows } = await client.query(
                `
                      DELETE FROM reviews
                      WHERE "reviewId" = $1;
                  `,
                [idValue]
              );
          
              return rows[0];
        } catch (error) {
            console.log("ERROR DELETING REVIEW BY ID db/delete.js", error)
        }
    }

async function deleteCommentById(idValue){

    try {
        const { rows } = await client.query(
            `
                  DELETE FROM messages
                  WHERE "messageId" = $1;
              `,
            [idValue]
          );
      
          return rows[0];
    } catch (error) {
        console.log("ERROR DELETING REVIEW BY ID db/delete.js", error)
    }

}


module.exports = {deleteCommentById, deleteReviewById,deleteUserById, deleteUserByUsername}