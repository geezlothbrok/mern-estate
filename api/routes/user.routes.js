import express from "express"
import { test, updateUser, deleteUser, getUserListings, getUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.get("/test", test); // Test route to check if the server is running

// Define a route for updating user information
router.post("/update/:id", verifyToken, updateUser);

// Define a route for deleting a user
// The route is protected by the verifyToken middleware
router.delete("/delete/:id", verifyToken, deleteUser);

// Define a route for getting user listings
// The route is protected by the verifyToken middleware
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);

export default router;

