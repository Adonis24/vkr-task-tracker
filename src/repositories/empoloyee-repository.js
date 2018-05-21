const Employee = require('../models/employee')

async function addEmployee(employee) {
    const newEmployee = new Employee({
        firstName: employee.firstName,
        lastName: employee.lastName,
        surName: employee.surName,
        position: employee.position,
        departmentId: employee.departmentId,
        login: employee.login,
        password: employee.password,
        approved: employee.approved
    })

    console.log(newEmployee)

    return await newEmployee.save()
}

async function getEmployee(id) {
    return await Employee.findById(id)
}

async function getEmployeeByLogin(login) {
    return await Employee.findOne({ login: login })
}

async function getEmployeeList() {
    return await Employee.find({ login: { $ne: 'root_admin' } })
}

module.exports.addEmployee = addEmployee
module.exports.getEmployee = getEmployee
module.exports.getEmployeeByLogin = getEmployeeByLogin
module.exports.getEmployeeList = getEmployeeList