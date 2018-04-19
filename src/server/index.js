const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const config = require('../../config')
const taskRepository = require('../repositories/tasks-repository')

const app = express()
const port = process.env.PORT || 4000

mongoose.connect(config.connectionString)

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    extended: true
}))

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

app.post('/task/new', async (request, response) => {
    await taskRepository.addTask({
        title: request.body.title,
        description: request.body.description,
        status: request.body.status
    })

    response.redirect('/')
})

app.listen(port, () => {
    console.log(`Server is listening to ${port} `)
})