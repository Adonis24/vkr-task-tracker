const express = require('express')

const taskRepository = require('../../repositories/tasks-repository')
const taskStatus = require('../../resources/task-status')

const router = express.Router()

router.get('/status', async (request, response) => {
    const taskId = request.query.id
    const status = request.query.status

    switch (status) {
        case taskStatus.todo: {
            await taskRepository.setTaskStatusTodo(taskId)
        } break
        case taskStatus.wip: {
            await taskRepository.setTaskStatusWip(taskId, Date.parse((new Date).toUTCString()))
            break
        }
        case taskStatus.done: {
            await taskRepository.setTaskStatusDone(taskId, Date.parse((new Date).toUTCString()))
        }
    }

    response.redirect('/')
})

router.get('/remove', async (request, response) => {
    const taskId = request.query.id

    await taskRepository.removeTask(taskId)

    response.redirect('/')
})


router.post('/new', async (request, response) => {
    await taskRepository.addTask({
        title: request.body.title,
        description: request.body.description,
        employeeId: request.body.responsible
        
    })

    response.redirect('/')
})

module.exports = router