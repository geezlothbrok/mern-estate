import express from "express"
import { createListing, deleteListing, updateListing, getListing, getListings } from "../controllers/listing.controller.js"
import { verifyToken } from "../utils/verifyUser.js"


// Create a new router instance
// This router will handle all routes related to listings
const router = express.Router()


// Define a route for creating a new listing
// The route is protected by the verifyToken middleware
router.post("/create", verifyToken, createListing);

// Define a route for deleting a listing by its ID
// The route is protected by the verifyToken middleware
router.delete("/delete/:id", verifyToken, deleteListing);

// Define a route for updating a listing by its ID
// The route is protected by the verifyToken middleware
router.post("/update/:id", verifyToken, updateListing);

router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;