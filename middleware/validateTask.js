module.exports = (req, res, next) => {
    const { title, completed } = req.body;

    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
            const err = new Error('Title must be a non-empty string');
            err.status = 400;
            return next(err);
        }
        req.body.title = title.trim();
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
        const err = new Error('Completed must be a boolean');
        err.status = 400;
        return next(err);
    }

    next();
};
