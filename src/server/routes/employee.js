const express = require('express')
const path = require('path')

const Router = express.Router

const employeeService = require('../../services/employee-service')
const employeeRepository = require('../../repositories/empoloyee-repository')
const departmentRepository = require('../../repositories/department-repository')
const accessGranted = require('../auth-middleware').accessGranted

const employeeRouter = new Router()

employeeRouter.get('/employee', accessGranted, async (request, response) => {
    const employeeId = request.query.id

    const employee = await employeeService.getEmployee(employeeId)
    const employeeTasks = await employeeService.getEmployeeTasks(employeeId)

    response.render('employee/employee', {
        employee: employee,
        plannedTasks: employeeTasks.plannedTasks,
        inProgressTasks: employeeTasks.inPorgressTasks,
        finishedTasks: employeeTasks.finishedTasks,
        isAdmin: request.session.isAdmin
    })
})


employeeRouter.get('/approve', accessGranted, async (request, response) => {
    const employeeId = request.query.id

    await employeeService.approveEmployee(employeeId)

    response.redirect('employees/list/notapproved')
})


employeeRouter.get('/list', accessGranted, async (request, response) => {
    const employees = await employeeService.getEmployeeList()
    const departments = await departmentRepository.getDepartmentList()

    response.render('employee/list', {
        employees: employees,
        departments: departments,
        isAdmin: request.session.isAdmin
    })
})

employeeRouter.get('/list/notapproved', accessGranted, async (request, response) => {
    const employees = await employeeService.getNotApprovedEmployeeList()
    const departments = await departmentRepository.getDepartmentList()

    response.render('employee/notapproved-list', {
        employees: employees,
        departments: departments,
        isAdmin: request.session.isAdmin
    })
})

module.exports = employeeRouter