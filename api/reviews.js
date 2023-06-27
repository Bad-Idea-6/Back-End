const express = require("express");
const reviewsRouter = express.Router();
const { fetchAllReviews } = require("../db/reviews");

reviewsRouter.get("/", async (request, response) => {
  try {
    const allReviews = await fetchAllReviews();

    if (allReviews && allReviews.length) {
      allReviews.forEach((e) => {
        delete e.password;
      });
      response.send(allReviews);
    } else {
      response.send("No reviews were found");
    }
  } catch (error) {
    throw error;
  }
});

module.exports = reviewsRouter;