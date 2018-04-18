const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 4000

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (request, response) => {
    const plannedTasks = [
        {
            title: 'task 1',
            description: 'task 1',
            status: 'todo'
        },
        {
            title: 'task 2',
            description: 'task 2',
            status: 'todo'
        },
    ]

    const inPorgressTasks = [
        {
            title: 'task 3',
            description: 'task 3',
            status: 'wip'
        }
    ]

    const finishedTasks = [
        {
            title: 'task 4',
            description: 'task 4',
            status: 'done'
        }
    ]


    response.render('index', {
        plannedTasks: plannedTasks,
        inProgressTasks: inPorgressTasks,
        finishedTasks: finishedTasks
    })
})

app.listen(port, () => {
    console.log(`Server is listening to ${port} `)
})