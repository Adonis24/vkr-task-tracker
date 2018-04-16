const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.get('/', (request, response) => {
    response.json({
        started: true
    })
})

app.listen(port, () => {
    console.log(`Server is listening to ${port} `)
})