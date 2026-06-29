const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
        const err = new Error('Unauthorized: No token provided');
        err.status = 401;
        return next(err);
    }

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId };
        next();
    } catch (err) {
        err.status = 401;
        next(err);
    }
};
module.exports = auth;