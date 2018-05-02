const Department = require('../models/department')

async function getDepartment(id) {
    return await Department.findById(id)
}

module.exports.getDepartment = getDepartment