import express from "express";
import bodyParser from  "body-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

//ToDo List Sample
const todos = [
    {
        id: 1,
        title: "Write Python code",
        description: "Complete Python coding exercise",
        completed: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        title: "Write JavaScript code",
        description: "Complete JavaScript coding exercise",
        completed: false,
        createdAt: new Date().toISOString(),
    }
];

// Basic Input Validation Middleware
function validateTodoInput(req, res, next) {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required." });
    }
    next();
}

//API Endpoints
app.get('/', (req, res) => {
    res.send('<h1>Todo List Home Page</h1>');
});

// GET /todos - List all todo items
app.get('/todos', (req, res) => {
    res.json(todos);
});

// GET /todos/:id - Get a specific todo item
app.get('/todos/:id', (req, res) => {
    let todo = todos.filter((todo) => todo.id == req.params.id)
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json("Todo not found");
    }
});

// POST /todos - Create a new todo item
app.post("/todos", (req, res) => {
    let { title, description } = req.body;
    let newTodo = {
        id: uuidv4(),
        title,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    res.status(201).json(newTodo); // Return the created todo item 
});

// PUT /todos/:id - Update a todo item
app.put("/todos/:id", (req, res) => {
    let todo = todos.find (todo =>todo.id == req.params.id);
    if (todo){
        todo.title = req.body.title || todo.title;
        todo.description = req.body.description || todo.description;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        
        res.json([todos]);
    } else {
        res.status(404).send("Todo with given id doesn't exist")
    }
});

// DELETE /todos/:id - Delete a todo item
app.delete("/todos/:id", (req, res) => {
    let index = todos.findIndex(todo => todo.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Todo not found." });
    }
    todos.splice(index, 1);
    res.status(204).end();
});
// Accessing `/todos/search` without a parameter
app.get('/todos/search', (req, res) => {
    res.status(400).json({ error: "title required." });
});

// Search todos by title (GET /todos/search)
app.get('/todos/search/:title', (req, res) => {
    let { title } = req.params;

    if (!title.trim() ) {
        return res.status(400).json({ error: "Search title is required." });
    }
    let result = todos.filter(todo => todo.title.toLowerCase().includes(title.toLowerCase()));

    if (!result.length){
        return res.status(404).json({ error: "No todos found with that title." });
    } 
    res.json(result);
});



app.listen(PORT, () => {
    console.log(`Server Running on port: http://localhost:${PORT}`);
});

