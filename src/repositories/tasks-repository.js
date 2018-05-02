const Task = require('../models/task')
const Employee = require('../models/employee')
const taskStatus = require('../resources/task-status')

async function getTaskByStatus(status) {
    const tasks = await Task.find({ status: status })

    const tasksWithEmployees = tasks.map(async (task) => {
        const employee = await Employee.findById(task.employeeId)
        return {
            _id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            employee: employee
        }
    })

    return Promise.all(tasksWithEmployees)
}

async function getEmployeeTaskByStatus(employeeId, status) {
    return await Task.find({ status: status, employeeId: employeeId })
}

async function addTask(task) {
    const newTask = new Task({
        title: task.title,
        description: task.description,
        status: taskStatus.todo,
        employeeId: task.employeeId,
        creationDate: Date.parse((new Date).toUTCString())
    })


    await newTask.save()
}

async function setTaskStatusTodo(id) {
    return await Task.findByIdAndUpdate(id, {
        status: taskStatus.todo,
        toInProgressStateDate: null,
        doneDate: null
    })
}

async function setTaskStatusWip(id, statusDate) {
    return await Task.findByIdAndUpdate(id, {
        status: taskStatus.wip,
        toInProgressStateDate: statusDate,
        doneDate: null
    })
}

async function setTaskStatusDone(id, statusDate) {
    return await Task.findByIdAndUpdate(id, {
        status: taskStatus.done,
        doneDate: statusDate
    })
}

async function removeTask(id) {
    return await Task.findByIdAndRemove(id)
}

module.exports.getTaskByStatus = getTaskByStatus
module.exports.getEmployeeTaskByStatus = getEmployeeTaskByStatus

module.exports.setTaskStatusTodo = setTaskStatusTodo
module.exports.setTaskStatusWip = setTaskStatusWip
module.exports.setTaskStatusDone = setTaskStatusDone

module.exports.removeTask = removeTask
module.exports.addTask = addTask