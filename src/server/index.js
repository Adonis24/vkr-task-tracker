const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const config = require('../../config')
const taskRepository = require('../repositories/tasks-repository')
const employeeService = require('../services/employee-service')
const taskStatus = require('../resources/task-status')

const task = require('./routes/task')

const app = express()
const port = process.env.PORT || 4000

mongoose.connect(config.connectionString)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/task', task)

app.get('/', async (request, response) => {
    const plannedTasks = await taskRepository.getTaskByStatus(taskStatus.todo)
    const inPorgressTasks = await taskRepository.getTaskByStatus(taskStatus.wip)
    const finishedTasks = await taskRepository.getTaskByStatus(taskStatus.done)

    response.render('index', {
        plannedTasks: plannedTasks,
        inProgressTasks: inPorgressTasks,
        finishedTasks: finishedTasks
    })
})

app.get('/employee', async (request, response) => {
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

app.listen(port, () => {
    console.log(`Server is listening to ${port} `)
})