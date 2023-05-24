const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    id:{
        type:Number,
        default: -1
    },
    task:{
        type: String,
        required: true
    },
    status:{
        type:String,
        default:'doing'
    }
})
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
