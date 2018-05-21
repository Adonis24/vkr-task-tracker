const employeeService = require('../services/employee-service')

async function accessGranted(request, response, next) {
    if (request.session && request.session.login) {
        const isApprovedUser = await employeeService.isEmployeeApproved(request.session.login)
        if (isApprovedUser) {
            return next();
        } else {
            response.redirect('/signin')
        }
    } else {
        response.redirect('/signin')
    }
}

async function adminAccessGranted(request, response, next) {
    if (request.session && request.session.login) {
        const isApprovedUser = await employeeService.isEmployeeApproved(request.session.login)
        if (isApprovedUser) {
            const isAdmin = employeeService.isEmployeeAdmin(request.session.login)

            if (isAdmin) {
                return next();
            } else {
                response.redirect('/denied')    
            }
        } else {
            response.redirect('/signin')
        }
    } else {
        response.redirect('/signin')
    }
}

module.exports.accessGranted = accessGranted
module.exports.adminAccessGranted = adminAccessGranted