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

// var data = [
//     {
//         "id": 1,
//         "task": "code",
//         "status": "doing",
//     },
//     {
//         "id": 2,
//         "task": "eat",
//         "status": "done",
//     }
// ];

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
    res.send("unimplemented");
})

app.get('/tasks', (req, res) => {
    res.send("unimplemented");
})

app.get('/tasks/check', (req, res) => {
    const id = req.query.taskid;
    const tasks = readData();
    res.send(tasks[id-1].status)
})

app.listen(9999);