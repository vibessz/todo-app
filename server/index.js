const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

let tasks = [
    {id:1,
    text: "cheese",
    done: false}
];

let nextid = 2;


app.get('/', (req, res) => {
    res.send("This will be the home page!");
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    let task = { id: nextid++, text: req.body.text, done: false};
    tasks.push(task);
    res.json(tasks);
});

app.delete('/tasks/:id', (req, res) => {
    let delId = Number(req.params.id);
    tasks = tasks.filter(task => task.id !== delId);
    res.json(tasks);
});

app.put('/tasks/:id', (req, res) => {
    let updateId = Number(req.params.id);
    let updateCont = req.body.text

    let task = tasks.find(task => task.id === updateId);
    if (!task){
        return res.status(404).json({ error: "Task not found" });
    }
    task.text = updateCont
    res.json(tasks);

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});