const Router = require('express').Router

const departmentRepository = require('../../repositories/department-repository')

const departmentRouter = new Router()

departmentRouter.get('/list', async (request, response) => {
    const departments = await departmentRepository.getDepartmentList()

    response.render('department/list', { departments: departments })
})

departmentRouter.post('/new', async (request, response) => {
    const departments = await departmentRepository.addDepartment(request.body.name)

    response.redirect('/departments/list')
})

module.exports = departmentRouter