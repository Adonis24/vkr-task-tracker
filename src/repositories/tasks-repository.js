const Task = require('../models/task')
const Employee = require('../models/employee')

async function getTaskByStatus(status) {
    const tasks = await Task.find({ status: status })

    const tasksWithEmployees = tasks.map(async (task) => {
        const employee = await Employee.findById(task.employeeId)
        return {
            title: task.title,
            description: task.description,
            status: task.status,
            employee: employee
        }
    })

    return Promise.all(tasksWithEmployees)
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