const express = require('express');
const utils = require('./utils');
const constant = require('./constant');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
})

app.post('/tasks', (req, res) => {
    const tasks = utils.readData();
    const newTask = {
        "id" : tasks.length + 1,
        "task": req.body.taskCreate,
        "status": "doing"
    }
    tasks.push(newTask);
    utils.writeData(tasks);
    res.send(newTask);
})

app.post('/tasks/commit', (req, res) => {
    const tasks = utils.readData();
    const id = req.body.taskid;
    const status = req.body.status;
    const commitTask = {
        "id" : id,
        "task" : tasks[id-1].task,
        "status": status
    }
    tasks[id-1] = commitTask;
    utils.writeData(tasks);
    res.send(commitTask);
})

app.get('/tasks', (req, res) => {
    const tasks = utils.readData();
    const status = req.body.status;
    if(status == null){
        res.send(tasks);
    }
    else {
        const filtered = tasks.filter(s => s.status === status);
        res.send(filtered);
    }
})

app.get('/tasks/check', (req, res) => {
    const id = req.body.taskid;
    const tasks = utils.readData();
    res.send(tasks[id-1].status)
})

app.listen(constant.PORT, () => {
    console.log(`starting server at http://localhost:${constant.PORT}`)
});