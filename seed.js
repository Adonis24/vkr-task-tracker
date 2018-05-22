const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const config = require('./config');
const Task = require('./src/models/task');
const Employee = require('./src/models/employee');
const Department = require('./src/models/department')

const taskStatus = require('./src/resources/task-status');

const itDepartment = new Department({
    name: 'Отдел разработки информационных система'
})

const programmer = new Employee({
    lastName: 'Горемыкин',
    firstName: 'Бронислав',
    surName: 'Филиппович',
    position: 'Программист',
    departmentId: itDepartment._id,
    login: 'gbf',
    password: bcrypt.hashSync('38ea0b9d', bcrypt.genSaltSync(10)),
    approved: true
});

const engineer = new Employee({
    lastName: 'Шипицын',
    firstName: 'Адам',
    surName: 'Афанасиевич',
    position: 'Системный администратор',
    departmentId: itDepartment._id,
    login: 'saa',
    password: bcrypt.hashSync('38ea0b9d', bcrypt.genSaltSync(10)),
    approved: true
});

const support = new Employee({
    lastName: 'Пьянков',
    firstName: 'Вениамин',
    surName: 'Ефремович',
    position: 'Инженер тех. поддержки',
    departmentId: itDepartment._id,
    login: 'pve',
    password: bcrypt.hashSync('38ea0b9d', bcrypt.genSaltSync(10)),
    approved: true
});

const rootAdmin = new Employee({
    lastName: 'root_admin',
    firstName: 'root_admin',
    surName: 'root_admin',
    position: 'root_admin',
    departmentId: itDepartment._id,
    login: 'root_admin',
    password: bcrypt.hashSync('38ea0b9d', bcrypt.genSaltSync(10)),
    approved: true
});

const plannedTask = new Task({
    employeeId: support._id,
    title: 'Прогрев сайтов',
    description: 'preloadEnabled / Always Running / App Init для самопрогрева',
    status: taskStatus.todo,
    creationDate: Date.parse((new Date(2018, 4, 20, 8, 30)).toUTCString()),
    toInProgressStateDate: null,
    doneDate: null
});

const inProgressTask = new Task({
    employeeId: engineer._id,
    title: 'Переехать на новые NGINX (nginx-ext-1/2)',
    description: 'Убрать все метрики из prometheus',
    status: taskStatus.todo,
    creationDate: Date.parse((new Date(2018, 4, 21, 9, 30)).toUTCString()),
    toInProgressStateDate: null,
    doneDate: null
});

const finishedTask = new Task({
    employeeId: programmer._id,
    title: 'API для MessageService ',
    description: 'Appservice не должен иметь доступ к БД',
    status: taskStatus.todo,
    creationDate: Date.parse((new Date(2018, 4, 19, 7, 30)).toUTCString()),
    toInProgressStateDate: null,
    doneDate: null
});

async function dropCollections(callback) {
    await Task.remove({})
    await Employee.remove({})
    await Department.remove({})

    callback()
}

async function setCollections(callback) {
    await itDepartment.save()
    await inProgressTask.save()
    await finishedTask.save()
    await programmer.save()
    await engineer.save()
    await support.save()
    await rootAdmin.save()
    await plannedTask.save()

    callback()
}

mongoose.connect(config.connectionString);

dropCollections(() => {
    setCollections(() => {
        process.exit(0)
    })
})





