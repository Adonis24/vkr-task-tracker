const bcrypt = require('bcrypt')

const employeeRepository = require('../repositories/empoloyee-repository')
const departmentRepository = require('../repositories/department-repository')
const taskRepository = require('../repositories/tasks-repository')

const taskStatus = require('../resources/task-status')

async function addNotApprovedEmployee(employee) {
    const cryptedPassword = bcrypt.hashSync(employee.password, bcrypt.genSaltSync(10))

    return await employeeRepository.addEmployee({
        firstName: employee.firstName,
        lastName: employee.lastName,
        surName: employee.surName,
        position: employee.position,
        departmentId: employee.departmentId,
        login: employee.login,
        password: cryptedPassword,
        approved: false
    })
}

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

async function getEmployeeNameList() {
    const employees = await employeeRepository.getEmployeeList()
    const employeeNameList = employees.map(employee => {
        return {
            _id: employee._id,
            fullName: `${employee.lastName} ${employee.firstName} ${employee.surName}`
        }
    })

    return employeeNameList
}

async function getEmployeeList() {
    const employees = await employeeRepository.getEmployeeList()
    const employeeNameList = employees.map(async (employee) => {
        const employeeDepartment = await departmentRepository.getDepartment(employee.departmentId)

        return {
            _id: employee._id,
            fullName: `${employee.lastName} ${employee.firstName} ${employee.surName}`,
            position: employee.position,
            department: employeeDepartment
        }
    })

    return Promise.all(employeeNameList)
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

async function validateEmployee(login, passwrod) {
    const employee = await employeeRepository.getEmployeeByLogin(login)

    if (employee) {
        const passwrodIsValid = bcrypt.compareSync(passwrod, employee.password)
        if (passwrodIsValid) {
            if (employee.approved) {
                return {
                    status: true,
                    message: 'Доступ разрешен'
                }
            } else {
                return {
                    status: true,
                    message: 'Ваша учетная запись еще не прошла проверку'
                }
            }
        } else {
            return {
                status: false,
                message: 'Неверный пароль'
            }
        }
    } else {
        return {
            status: false,
            message: 'Сотрудника с такими данными не существует'
        }
    }
}

function isEmployeeAdmin(login) {
    return login == 'root_admin'
}

async function isEmployeeExists(login) {
    const existedEmployee = await employeeRepository.getEmployeeByLogin(login)

    return existedEmployee != null
}

async function isEmployeeApproved(login) {
    const employee = await employeeRepository.getEmployeeByLogin(login)

    return employee.approved
}


module.exports.addNotApprovedEmployee = addNotApprovedEmployee

module.exports.getEmployee = getEmployee
module.exports.getEmployeeTasks = getEmployeeTasks
module.exports.getEmployeeNameList = getEmployeeNameList
module.exports.getEmployeeList = getEmployeeList

module.exports.validateEmployee = validateEmployee
module.exports.isEmployeeAdmin = isEmployeeAdmin
module.exports.isEmployeeExists = isEmployeeExists
module.exports.isEmployeeApproved = isEmployeeApproved