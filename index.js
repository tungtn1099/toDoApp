const express = require('express');
const utils = require('./utils');
const constant = require('./constant');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbname = 'todo';
const TaskModel = require('./model');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
})

app.post('/tasks', async (req, res) => {
    const tasks = await TaskModel.find({});
    const newTask = {
        "id" : tasks.length + 1,
        "task": req.body.taskCreate,
        "status": "doing"
    }
    const task = TaskModel(newTask);
    try{
        await task.save();
        res.send(task);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.post('/tasks/commit', async (req, res) => {
    const tasks = await TaskModel.find({});
    const id = req.body.taskid;
    const status = req.body.status;
    const commitTask = {
        "id" : id,
        "task" : tasks[id-1].task,
        "status": status
    }
    try{
        await TaskModel.updateOne({id: id}, {status: status});
        res.send(commitTask);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get('/tasks', async (req, res) => {
    const tasks = await TaskModel.find({});
    const status = req.query.status;
    if(status == null){
        res.send(tasks);
    }
    else {
        const filtered = tasks.filter(s => s.status === status);
        res.send(filtered);
    }
})

app.get('/tasks/check', async (req, res) => {
    const id = req.query.taskid;
    const tasks = await TaskModel.findOne({id : id}).exec();
    console.log(tasks);
    res.send(tasks);
})

app.listen(constant.PORT, () => {
    console.log(`starting server at http://localhost:${constant.PORT}`)
});