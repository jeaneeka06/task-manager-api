const express = require('express');
const router = express.Router();


const Task = require('../models/Task');


router.get('/', async (req, res) => {
    try {

        const tasks = await Task.find();

        res.status(200).json(tasks);
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {

        const task = await Task.findById(req.params.id);


        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const { title, completed } = req.body;


        const task = new Task({ title, completed });


        const savedTask = await task.save();


        res.status(201).json(savedTask);
    } catch (err) {

        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, completed } = req.body;


        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: { title, completed } },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {

        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted', task: deletedTask });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;