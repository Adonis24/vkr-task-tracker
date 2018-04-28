const Employee = require('../models/employee')

async function addEmployee(employee) {
    const newEmployee = new Employee({
        firstName: employee.firstName,
        lastName: employee.lastName,
        surName: employee.surName,
        position: employee.position
    })

    return await newEmployee.save()
}

async function getEmployee(id) {
    return await Employee.findById(id)
}

async function getEmployees(){
    return await Employee.find({})
}

module.exports.addEmployee = addEmployee
module.exports.getEmployee = getEmployee
module.exports.getEmployees = getEmployees