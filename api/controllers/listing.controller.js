import Listing from "../models/listing.model.js";

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