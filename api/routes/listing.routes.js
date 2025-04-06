import express from "express"
import { createListing, deleteListing } from "../controllers/listing.controller.js"
import { verifyToken } from "../utils/verifyUser.js"


// Create a new router instance
// This router will handle all routes related to listings
const router = express.Router()


// Define a route for creating a new listing
// The route is protected by the verifyToken middleware
router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;