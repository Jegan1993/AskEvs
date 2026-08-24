import Employee from "../models/Employee.js";

class EmployeeService {

    async createEmployee(data) {

        const {
            employeeName,
            email,
            department,
            designation,
            status,
            joiningDate
        } = data;


        const existingEmployee =
            await Employee.findOne({ email });


        if (existingEmployee) {

            const error =
                new Error(
                    "Employee email already exists"
                );

            error.statusCode = 409;

            throw error;
        }


        const employee =
            await Employee.create({
                employeeName,
                email,
                department,
                designation,
                status,
                joiningDate
            });


        return employee;
    }


    async getEmployees(query) {

        const {
            search = "",
            department,
            status,
            page = 1,
            limit = 10
        } = query;


        const pageNumber =
            Number(page);

        const limitNumber =
            Number(limit);


        const skip =
            (pageNumber - 1) *
            limitNumber;


        const filter = {};


        if (search) {

            filter.$or = [

                {
                    employeeName: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    email: {
                        $regex: search,
                        $options: "i"
                    }
                }

            ];
        }


        if (department) {

            filter.department =
                department;
        }


        if (status) {

            filter.status =
                status;
        }


        const total =
            await Employee.countDocuments(
                filter
            );


        const employees =
            await Employee
                .find(filter)
                .skip(skip)
                .limit(limitNumber)
                .sort({
                    createdAt: -1
                });


        return {

            employees,

            pagination: {

                total,

                page: pageNumber,

                limit: limitNumber,

                totalPages:
                    Math.ceil(
                        total / limitNumber
                    )
            }
        };
    }


    // GET SINGLE
    async getEmployeeById(id) {

        const employee =
            await Employee.findById(id);


        if (!employee) {

            const error =
                new Error(
                    "Employee not found"
                );

            error.statusCode = 404;

            throw error;
        }


        return employee;
    }


    // UPDATE
    async updateEmployee(id, data) {

        const employee =
            await Employee.findByIdAndUpdate(
                id,
                data,
                {
                    new: true,
                    runValidators: true
                }
            );


        if (!employee) {

            const error =
                new Error(
                    "Employee not found"
                );

            error.statusCode = 404;

            throw error;
        }


        return employee;
    }


    // DELETE
    async deleteEmployee(id) {

        const employee =
            await Employee.findByIdAndDelete(id);


        if (!employee) {

            const error =
                new Error(
                    "Employee not found"
                );

            error.statusCode = 404;

            throw error;
        }


        return employee;
    }


    async getAnalytics() {

        const totalEmployees =
            await Employee.countDocuments();


        const activeEmployees =
            await Employee.countDocuments({
                status: "Active"
            });


        const departmentWiseCount =
            await Employee.aggregate([

                {
                    $group: {
                        _id: "$department",

                        count: {
                            $sum: 1
                        }
                    }
                },

                {
                    $sort: {
                        count: -1
                    }
                }

            ]);


        const statusDistribution =
            await Employee.aggregate([

                {
                    $group: {
                        _id: "$status",

                        count: {
                            $sum: 1
                        }
                    }
                },

                {
                    $sort: {
                        count: -1
                    }
                }

            ]);


        const monthlyJoinedEmployees =
            await Employee.aggregate([

                {
                    $group: {

                        _id: {

                            year: {
                                $year:
                                    "$joiningDate"
                            },

                            month: {
                                $month:
                                    "$joiningDate"
                            }
                        },

                        count: {
                            $sum: 1
                        }
                    }
                },

                {
                    $sort: {
                        "_id.year": 1,
                        "_id.month": 1
                    }
                }

            ]);


        return {

            totalEmployees,

            activeEmployees,

            departmentWiseCount,

            statusDistribution,

            monthlyJoinedEmployees
        };
    }

}


export default new EmployeeService();