const mongoose = require('mongoose');

const config = require('./config');
const Task = require('./src/models/task');
const Employee = require('./src/models/employee');

const taskStatus = require('./src/resources/task-status');

const programmer = new Employee({
    lastName: 'Горемыкин',
    firstName: 'Бронислав',
    surName: 'Филиппович',
    position: 'Программист',
    login: null,
    password: null
});

const engineer = new Employee({
    lastName: 'Шипицын',
    firstName: 'Адам',
    surName: 'Афанасиевич',
    position: 'Системный администратор',
    login: null,
    password: null
});

const support = new Employee({
    lastName: 'Пьянков',
    firstName: 'Вениамин',
    surName: 'Ефремович',
    position: 'Инженер тех. поддержки',
    login: null,
    password: null
});

const plannedTask = new Task({
    employeeId: support._id,
    title: 'Прогрев сайтов',
    description: 'preloadEnabled / Always Running / App Init для самопрогрева',
    status: taskStatus.todo,
    creationDate: Date.parse((new Date).toUTCString()),
    toInProgressStateDate: null,
    doneDate: null
});

const inProgressTask = new Task({
    employeeId: engineer._id,
    title: 'Переехать на новые NGINX (nginx-ext-1/2)',
    description: 'Убрать все метрики из prometheus',
    status: taskStatus.todo,
    creationDate: Date.parse((new Date).toUTCString()),
    toInProgressStateDate: null,
    doneDate: null
});

const finishedTask = new Task({
    employeeId: programmer._id,
    title: 'API для MessageService ',
    description: 'Appservice не должен иметь доступ к БД',
    status: taskStatus.todo,
    creationDate: Date.parse((new Date).toUTCString()),
    toInProgressStateDate: null,
    doneDate: null
});

async function dropCollections(callback) {
    await Task.remove({})
    await Employee.remove({})

    callback()
}

async function setCollections(callback) {
    await inProgressTask.save()
    await finishedTask.save()
    await programmer.save()
    await engineer.save()
    await support.save()
    await plannedTask.save()

    callback()
}

mongoose.connect(config.connectionString);

dropCollections(() => {
    setCollections(() => {
        process.exit(0)
    })
})





