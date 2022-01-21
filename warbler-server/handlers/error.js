// if not 404, then it means a route is found, but something is wrong on the server side.
const errorHandler = (err, req, res, next) => {
    return res.status(err.status || 500).json({
        error:{
            message: err.message || "Server Error: Something went wrong."
        }
    });
}

module.exports = errorHandler;