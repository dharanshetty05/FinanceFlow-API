export const errorHandler = (err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        error: {
        code: err.code || 'SERVER_ERROR',
        message: err.message || 'Something went wrong'
        }
    });
};