const express = require('express')

const taskRepository = require('../../repositories/tasks-repository')

const router = express.Router()

router.get('/status', async (request, response) => {
    const taskId = request.query.id
    const status = request.query.status

    await taskRepository.setTaskStatus(taskId, status)

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
        status: request.body.status
    })

    response.redirect('/')
})

module.exports = router