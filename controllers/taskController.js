const Task = require('../models/Task');

// GET /tasks
exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user.userId });
        res.status(200).json({ status: 'success', data: tasks });
    } catch (err) {
        next(err);
    }
};

// GET /tasks/:id
exports.getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            const err = new Error('Task not found');
            err.status = 404;
            return next(err);
        }

        res.status(200).json({ status: 'success', data: task });
    } catch (err) {
        next(err);
    }
};

// POST /tasks
exports.createTask = async (req, res, next) => {
    try {
        req.body.user = req.user.userId;

        const task = await Task.create(req.body);

        res.status(201).json({ status: 'success', data: task });
    } catch (err) {
        next(err);
    }
};

// PUT /tasks/:id
exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            const err = new Error('Task not found');
            err.status = 404;
            return next(err);
        }

        res.status(200).json({ status: 'success', data: task });
    } catch (err) {
        next(err);
    }
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            const err = new Error('Task not found');
            err.status = 404;
            return next(err);
        }

        res.status(200).json({ status: 'success', message: 'Task deleted' });
    } catch (err) {
        next(err);
    }
};
