const Department = require('../models/department')

async function getDepartment(id) {
    return await Department.findById(id)
}

async function getDepartmentList() {
    return await Department.find({})
}

module.exports.getDepartment = getDepartment
module.exports.getDepartmentList = getDepartmentList