// This file contains the error handler for the API
// It exports a function that takes a status code and message as parameters
export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}