const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    surName: { type: String, required: true },
    position: { type: String, required: true },
    departmentId: { type: String, required: true },
    login: { type: String },
    password: { type: String }
})

const employeeModel = mongoose.model('employee', employeeSchema)

module.exports = employeeModel