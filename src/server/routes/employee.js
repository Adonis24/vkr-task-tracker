const express = require('express')
const path = require('path')

const Router = express.Router

const employeeService = require('../../services/employee-service')
const employeeRepository = require('../../repositories/empoloyee-repository')
const departmentRepository = require('../../repositories/department-repository')

const employeeRouter = new Router()

employeeRouter.get('/employee', async (request, response) => {
    const employeeId = request.query.id

    const employee = await employeeService.getEmployee(employeeId)
    const employeeTasks = await employeeService.getEmployeeTasks(employeeId)

    response.render('employee', {
        employee: employee,
        plannedTasks: employeeTasks.plannedTasks,
        inProgressTasks: employeeTasks.inPorgressTasks,
        finishedTasks: employeeTasks.finishedTasks
    })
})

employeeRouter.post('/new', async (request, response) => {
    await employeeRepository.addEmployee({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        surName: request.body.surName,
        position: request.body.position,
        departmentId: request.body.department
    })

    response.redirect('/employees/list')
})

employeeRouter.get('/list', async (request, response) => {
    const employees = await employeeService.getEmployeeList()
    const departments = await departmentRepository.getDepartmentList()

    response.render('employee-list', {
        employees: employees,
        departments: departments
    })
})

module.exports = employeeRouter