const express = require('express')
const path = require('path')

const Router = express.Router

const employeeService = require('../../services/employee-service')

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

employeeRouter.get('/list', async (request, response) => {
    const employees = await employeeService.getEmployeeList()

    response.json({ employees: employees })
})

module.exports = employeeRouter