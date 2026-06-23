const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(422).json({
            status: 'error',
            message: 'Validation failed',
            errors: messages,
        });
    }
    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 'error',
            message: `Invalid ID format: ${err.value}`,
        });
    }
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal server error',

    });
};
module.exports = errorHandler;