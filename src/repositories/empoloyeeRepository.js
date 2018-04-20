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