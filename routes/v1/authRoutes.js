const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const router = express.Router();

// Register route
router.post('/register', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ status: 'success', message: 'User registered' });
    } catch (err) {
        next(err);
    }
});

// Login route
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error('Invalid credentials');
            err.status = 401;
            return next(err);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            const err = new Error('Invalid credentials');
            err.status = 401;
            return next(err);
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ status: 'success', token });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
