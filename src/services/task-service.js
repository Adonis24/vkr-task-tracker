const taskRepository = require('../repositories/tasks-repository')
const employeeRepository = require('../repositories/empoloyee-repository')
const taskStatus = require('../resources/task-status')

async function getFinishedTasks() {
    const tasks = await taskRepository.getTaskByStatus(taskStatus.done)
    const tasksWithCalculatedTime = tasks.map(task => {
        return {
            _id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            employee: task.employee,
            excecutionTime: calculateExcecutionTime(task.creationDate, task.doneDate),
            doneDate: convertToRussianDateFormat(task.doneDate)
        }
    })

    return tasksWithCalculatedTime
}

async function getStatistic() {
    let employees = await employeeRepository.getEmployeeList()

    const plannedTasks = await taskRepository.getTaskByStatus(taskStatus.todo)
    const inProgressTasks = await taskRepository.getTaskByStatus(taskStatus.wip)
    const finishedTasks = await taskRepository.getTaskByStatus(taskStatus.done)

    let totalExcecutionTime = 0
    const totalCount = plannedTasks.length + inProgressTasks.length + finishedTasks.length

    finishedTasks.forEach(task => {
        totalExcecutionTime += calculateExcecutionTime(task.creationDate, task.doneDate)
    })

    employees = employees.map(async (employee) => {
        const employeePlannedTasks = await taskRepository.getEmployeeTaskByStatus(employee._id, taskStatus.todo)
        const employeeinProgressTasks = await taskRepository.getEmployeeTaskByStatus(employee._id, taskStatus.wip)
        const employeefinishedTasks = await taskRepository.getEmployeeTaskByStatus(employee._id, taskStatus.done)

        
        const employeeTasksTotalCount = employeePlannedTasks.length + employeeinProgressTasks.length + employeefinishedTasks.length
        console.log(employeeTasksTotalCount)
        return {
            fullName: `${employee.lastName} ${employee.firstName[0]}. ${employee.lastName[0]}.`,
            finishedPercent: Math.round(employeefinishedTasks.length / employeeTasksTotalCount * 100) || 0,
        }
    })

    return {
        employees: await Promise.all(employees),
        plannedTasks: plannedTasks.length,
        inProgressTasks: inProgressTasks.length,
        finishedTasks: finishedTasks.length,
        averageExcecutionTime: (totalExcecutionTime / finishedTasks.length).toFixed(2) || 0,
        plannedTasksPercent: Math.round(plannedTasks.length / totalCount * 100),
        inProgressTasksPercent: Math.round(inProgressTasks.length / totalCount * 100),
        finishedTasksPercent: Math.round(finishedTasks.length / totalCount * 100),
    }
}

function calculateExcecutionTime(creationDateStamp, doneDateStamp) {
    const doneDate = new Date(doneDateStamp)
    const creationDate = new Date(creationDateStamp)

    return Math.round((Math.abs(doneDate - creationDate) / 36e5) / 24 * 8)
}

function convertToRussianDateFormat(timeStamp) {
    const date = new Date(timeStamp)

    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
}

module.exports.getFinishedTasks = getFinishedTasks
module.exports.getStatistic = getStatistic