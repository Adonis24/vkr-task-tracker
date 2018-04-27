const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    employeeId: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true }
})

module.exports = mongoose.model('task', taskSchema)