const errorResponse = require("../utils/errorResponse");



const errorHandler = (err, req, res, next) => {
    let errorr = { ...err }
    errorr.message = err.message

    //mongoose cast error
    if (err.name === 'castError') {
        const message = 'Resoures is not found'
        error = new errorResponse(message, 404)
    }
    //duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value enteres'
        error = new errorResponse(message, 400)

    }
    //mongoose validatuon error
    if (err.name === 'validationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new errorResponse(message, 404)
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'server error'
        })
    }

}
module.exports = errorHandler

