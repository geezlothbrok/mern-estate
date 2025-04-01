import express from "express"
import { test, updateUser, deleteUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.get("/test", test); // Test route to check if the server is running

// Define a route for updating user information
router.post("/update/:id", verifyToken, updateUser);

// Define a route for deleting a user
// The route is protected by the verifyToken middleware
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;

