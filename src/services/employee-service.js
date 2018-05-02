const employeeRepository = require('../repositories/empoloyeeRepository')
const departmentRepository = require('../repositories/department-repository')
const taskRepository = require('../repositories/tasks-repository')

const taskStatus = require('../resources/task-status')

async function getEmployee(id) {
    const employee = await employeeRepository.getEmployee(id)
    const employeeDepartment = await departmentRepository.getDepartment(employee.departmentId)

    return {
        _id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        surName: employee.surName,
        position: employee.position,
        department: employeeDepartment
    }
}


async function getEmployeeTasks(id) {
    const plannedTasks = await taskRepository.getEmployeeTaskByStatus(id, taskStatus.todo)
    const inPorgressTasks = await taskRepository.getEmployeeTaskByStatus(id, taskStatus.wip)
    const finishedTasks = await taskRepository.getEmployeeTaskByStatus(id, taskStatus.done)

    return {
        plannedTasks,
        inPorgressTasks,
        finishedTasks
    }

}

module.exports.getEmployee = getEmployee
module.exports.getEmployeeTasks = getEmployeeTasks