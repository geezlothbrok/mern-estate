import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new listing
// @route POST /api/listing/create
export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};


// Delete a listing
// @route DELETE /api/listing/delete/:id
export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listing not found"));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can delete only your listings"));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json("Listing has been deleted.");
    } catch (error) {
        next(error);
        
    }
};


// Update a listing
// @route POST /api/listing/update/:id
export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listing not found"));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can update only your listings"));
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body ,
            { new: true }
        );
        return res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
}

// Get a listing by ID
// @route GET /api/listing/get/:id
export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, "Listing not found"));
        }
        return res.status(200).json(listing);
    } catch (error) {
        next(error);
        
    }
}


// Get all listings with optional filters and pagination
// @route GET /api/listing/get
export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let furnished = req.query.furnished;

        if(furnished === undefined || furnished === false) {
            furnished = {$in: [false, true]};
        };

        let parking = req.query.parking;

        if(parking === undefined || parking === false) {
            parking = {$in: [false, true]};
        };

        let type = req.query.type;

        if(type === undefined || type === "all") {
            type = {$in: ["sale", "rent"]};
        };

        const searcTerm = req.query.searchTerm || "";

        const sort = req.query.sort || "createdAt";

        const order = req.query.order || "desc";

        const listings = await Listing.find({
            name: {$regex: searcTerm, $options: "i" },
            furnished,
            parking,
            type,
        }).sort({ [sort]: order }).limit(limit).skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
        
    }
}