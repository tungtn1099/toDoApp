const express = require('express')
const app = express();
const fs = require('fs');
const dataSource = 'data.json';
app.use(express.json());

function readData() {
    try {
        const buffer = fs.readFileSync(dataSource);
        return JSON.parse(buffer);
    } catch(err) {
        console.log("Error reading data", err);
        return [];
    }
}

function writeData(data) {
    const jsonString = JSON.stringify(data);
    fs.writeFile(dataSource, jsonString, err => {
        if(err) console.log('Error writing file', err);
        else console.log("Wrote");
    })
    
}

app.post('/tasks', (req, res) => {
    const tasks = readData();
    const newTask = {
        "id" : tasks.length + 1,
        "task": req.body.task,
        "status": "doing"
    }
    tasks.push(newTask);
    writeData(tasks);
    res.send(newTask);
})

app.post('/tasks/commit', (req, res) => {
    const tasks = readData();
    const id = req.query.taskid;
    const status = req.query.status;
    const commitTask = {
        "id" : id,
        "task" : tasks[id-1].task,
        "status": status
    }
    tasks[id-1] = commitTask;
    writeData(tasks);
    res.send(tasks);
})

app.get('/tasks', (req, res) => {
    const tasks = readData();
    const status = req.query.status;
    if(status == null){
        res.send(tasks);
    }
    else {
        var filtered = tasks.filter(s => s.status == status);
        res.send(filtered);
    }
})

app.get('/tasks/check', (req, res) => {
    const id = req.query.taskid;
    const tasks = readData();
    res.send(tasks[id-1].status)
})

app.listen(9999);