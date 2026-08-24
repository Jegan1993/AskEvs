import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        employeeName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        department: {
            type: String,
            required: true
        },

        designation: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        },

        joiningDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Employee = mongoose.model(
    "Employee",
    employeeSchema
);

export default Employee;