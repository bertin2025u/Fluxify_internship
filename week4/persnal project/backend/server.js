const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Temporary in-memory database
let tasks = [
    {
        id: 1,
        text: "Complete internship project",
        completed: false
    }
];

// Home Route
app.get("/", (req, res) => {
    res.json({ message: "Student Task Manager API" });
});

// Get All Tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Create Task
app.post("/tasks", (req, res) => {
    const newTask = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task created successfully",
        task: newTask
    });
});

// Update Task
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    res.json({
        message: "Task updated successfully"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});