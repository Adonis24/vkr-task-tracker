const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const config = require('../../config')
const taskRepository = require('../repositories/tasks-repository')

const app = express()
const port = process.env.PORT || 4000

mongoose.connect(config.connectionString)

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', async (request, response) => {
    const plannedTasks = await taskRepository.getPlannedTasks()
    const inPorgressTasks = await taskRepository.getInProgressTasks()
    const finishedTasks = await taskRepository.getFinishedTasks()


    response.render('index', {
        plannedTasks: plannedTasks,
        inProgressTasks: inPorgressTasks,
        finishedTasks: finishedTasks
    })
})

app.listen(port, () => {
    console.log(`Server is listening to ${port} `)
})