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