const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    surName: String,
    position: String,
    login: String,
    password: String
})

const employeeModel = mongoose.model('employee', employeeSchema)

module.exports = employeeModel