const Department = require('../models/department')

async function getDepartment(id) {
    return await Department.findById(id)
}

async function getDepartmentList() {
    return await Department.find({})
}

async function addDepartment(name){
    const newDepartment = new Department({
        name: name
    })

    return await newDepartment.save()
}

module.exports.getDepartment = getDepartment
module.exports.getDepartmentList = getDepartmentList
module.exports.addDepartment = addDepartment