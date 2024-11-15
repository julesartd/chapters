module.exports.responseMiddleware = (req, res, next) => {
    res.jsonSuccess = (data, statusCode) => {
        const response = {
            success: true,
            statusCode: statusCode,
            data: data
        }

        return res.status(statusCode).json(response);
    }

    res.jsonError = (message, statusCode) => {
        const response = {
            success: false,
            data: null,
            error: {
                message: message,
                code: statusCode
            }
        }

        return res.status(statusCode).json(response);
    }

    next();
}