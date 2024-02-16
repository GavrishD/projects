const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// const ejs = require("ejs");
const app = express();
const port = 3000;


// Replace the connection string with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/todolist';

// Create a mongoose model for to-do items
const Todo = mongoose.model('Todo', {
    text: String,
    done: Boolean,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.ejs');
    res.sendFile(path.join(__dirname, 'views', 'index.ejs'));
    res.render("index");
});

// Handle form submissions to add to-do items
app.post('/add', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.task,
        done: false,
    });

    try {
        await newTodo.save();
        res.send(`To-do item added successfully! ${newTodo}`);
    } catch (error) {
        res.status(500).send('Error adding to-do item: ' + error.message);
    }
});

// Start the server
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


// mongoose.connect("mongodb://localhost/todo_express", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// app.use(require("./routes/index"));
// app.use(require("./routes/todo"));

// app.listen(port, () => {
//     console.log(`Server started listenibg on http://localhost:${port}`)
// });
