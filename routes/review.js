const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
const reviewControler = require("../controllers/reviews.js");
//post
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewControler.createReview)
);

//delete
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewControler.deleteReview)
);

module.exports = router;
