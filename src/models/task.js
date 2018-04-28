const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    employeeId: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    creationDate: { type: Number, required: true },
    toInProgressStateDate: { type: Number },
    doneDate: { type: Number }
})

module.exports = mongoose.model('task', taskSchema)