const Task = require('../models/Task');
const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ status: 'success', data: tasks });
    } catch (err) {
        next(err);
    }
};
const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
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

const createTask = async (req, res, next) => {
    try {
        const { title, completed } = req.body;
        const task = await Task.create({ title, completed });
        res.status(201).json({ status: 'success', data: task });
    } catch (err) {
        next(err);
    }
};
const updateTask = async (req, res, next) => {
    try {
        const { title, completed } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: { title, completed } },
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

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            const err = new Error('Task not found');
            err.status = 404;
            return next(err);
        }
        res.status(200).json({ status: 'success', message: 'Task deleted', data: task });
    } catch (err) {
        next(err);
    }
};
module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };