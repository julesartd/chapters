module.exports.errorHandlerMiddleware = (err, req, res, next) => {
    const formattedError = {
        message: err.message || 'Internal server error',
        code: err.statusCode || 500
    };

    return res.status(formattedError.code).json({succes: false, data: null, error: formattedError});
}