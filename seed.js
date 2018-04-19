const mongoose = require('mongoose')

const config = require('./config')
const Task = require('./src/models/task')

mongoose.connect(config.connectionString)

const plannedTask = new Task({
    title: 'Прогрев сайтов',
    description: 'preloadEnabled / Always Running / App Init для самопрогрева',
    status: 'todo'
})

const inProgressTask = new Task({
    title: 'Переехать на новые NGINX (nginx-ext-1/2)',
    description: 'Убрать все метрики из prometheus',
    status: 'wip'
})

const finishedTask = new Task({
    title: 'API для MessageService ',
    description: 'Appservice не должен иметь доступ к БД',
    status: 'done'
})

plannedTask.save()
inProgressTask.save()
finishedTask.save()

process.exit(0)
