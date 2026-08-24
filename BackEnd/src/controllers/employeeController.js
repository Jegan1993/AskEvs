import employeeService
    from "../services/employeeService.js";

import asyncHandler
    from "../middleware/asyncHandler.js";

import sendResponse
    from "../utils/response.js";

import messages
    from "../utils/responseMessages.js";


class EmployeeController {

    // CREATE
    createEmployee = asyncHandler(
        async (req, res) => {

            const employee =
                await employeeService.createEmployee(
                    req.body
                );


            return sendResponse(
                res,
                201,
                true,
                messages.EMPLOYEE.CREATED,
                employee
            );
        }
    );


    // GET ALL
    getEmployees = asyncHandler(
        async (req, res) => {

            const result =
                await employeeService.getEmployees(
                    req.query
                );


            return sendResponse(
                res,
                200,
                true,
                messages.EMPLOYEE.FETCHED,
                result
            );
        }
    );


    // GET SINGLE
    getEmployeeById = asyncHandler(
        async (req, res) => {

            const employee =
                await employeeService.getEmployeeById(
                    req.params.id
                );


            return sendResponse(
                res,
                200,
                true,
                messages.EMPLOYEE.SINGLE_FETCHED,
                employee
            );
        }
    );


    // UPDATE
    updateEmployee = asyncHandler(
        async (req, res) => {

            const employee =
                await employeeService.updateEmployee(
                    req.params.id,
                    req.body
                );


            return sendResponse(
                res,
                200,
                true,
                messages.EMPLOYEE.UPDATED,
                employee
            );
        }
    );


    // DELETE
    deleteEmployee = asyncHandler(
        async (req, res) => {

            await employeeService.deleteEmployee(
                req.params.id
            );


            return sendResponse(
                res,
                200,
                true,
                messages.EMPLOYEE.DELETED
            );
        }
    );


    // ANALYTICS
    getAnalytics = asyncHandler(
        async (req, res) => {

            const analytics =
                await employeeService.getAnalytics();


            return sendResponse(
                res,
                200,
                true,
                messages.EMPLOYEE.ANALYTICS_FETCHED,
                analytics
            );
        }
    );

}


export default new EmployeeController();