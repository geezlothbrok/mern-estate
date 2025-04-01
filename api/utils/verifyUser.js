import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";


// Middleware to verify the JWT token
// This middleware checks if the user is authenticated by verifying the token in the request cookies
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) return next(errorHandler(401, "You are not authenticated!"));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(403, "Token is not valid!"));
        req.user = user;
        next();
    });
}