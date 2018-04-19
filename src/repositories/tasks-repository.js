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

module.exports.getPlannedTasks = getPlannedTasks
module.exports.getInProgressTasks = getInProgressTasks
module.exports.getFinishedTasks = getFinishedTasks