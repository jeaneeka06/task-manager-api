const validateTask = (req, res, next) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
        const err = new Error('Title is required and must be a non-empty string');
        err.status = 400;
        return next(err);
    }
    req.body.title = title.trim();
    next();
};
module.exports = validateTask;