import Joi from "joi";

export const createEmployeeValidation = Joi.object({
    employeeName: Joi.string()
        .min(2)
        .max(100)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    department: Joi.string()
        .required(),

    designation: Joi.string()
        .required(),

    status: Joi.string()
        .valid("Active", "Inactive")
        .required(),

    joiningDate: Joi.date()
        .required()
});