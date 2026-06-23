require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/v1/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ status: 'success', message: 'Task Manager API is running' });
});


app.use('/api/v1/tasks', taskRoutes);


app.use((req, res, next) => {
    const err = new Error(`Route not found: ${req.originalUrl}`);
    err.status = 404;
    next(err);
});


app.use(errorHandler);

const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    });


mongoose.connection.on('error', (err) => {
    console.error('MongoDB runtime error:', err.message);
});