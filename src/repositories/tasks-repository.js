const Task = require('../models/task')

async function getPlannedTasks() {
    return await Task.find({ status: 'todo' })
}

async function getInProgressTasks() {
    return await Task.find({ status: 'wip' })
}

async function getFinishedTasks() {
    return await Task.find({ status: 'done' })
}

async function addTask(task) {
    const newTask = new Task({
        title: task.title,
        description: task.description,
        status: task.status
    })


    await newTask.save()
}


module.exports.getPlannedTasks = getPlannedTasks
module.exports.getInProgressTasks = getInProgressTasks
module.exports.getFinishedTasks = getFinishedTasks
module.exports.addTask = addTask