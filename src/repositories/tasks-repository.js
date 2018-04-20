const Task = require('../models/task')

async function getTaskByStatus(status) {
    return await Task.find({ status: status })
}

async function addTask(task) {
    const newTask = new Task({
        title: task.title,
        description: task.description,
        status: task.status
    })


    await newTask.save()
}

async function setTaskStatus(id, status) {
    return await Task.findByIdAndUpdate(id, { status: status })
}

async function removeTask(id) {
    return await Task.findByIdAndRemove(id)
}


module.exports.getTaskByStatus = getTaskByStatus
module.exports.addTask = addTask
module.exports.setTaskStatus = setTaskStatus
module.exports.removeTask = removeTask