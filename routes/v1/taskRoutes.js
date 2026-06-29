const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const validateTask = require('../../middleware/validateTask');
const {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} = require('../../controllers/taskController');

router.use(authMiddleware);

router.get('/', getAllTasks);
router.post('/', validateTask, createTask);

router.get('/:id', getTaskById);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
