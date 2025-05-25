const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControler = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/", wrapAsync(listingControler.index));

//new
router
  .route("/new")
  .get(isLoggedIn, listingControler.renderNewForm)
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControler.createNewListing)
  );

//show
router.get("/:id", wrapAsync(listingControler.showListings));

//edit
router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(listingControler.editListingForm))
  .put(
    isLoggedIn,
    // isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControler.updateListing)
  );

//delete
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControler.deleteListing)
);

module.exports = router;
