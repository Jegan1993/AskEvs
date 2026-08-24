const messages = {

    AUTH: {

        REGISTER_SUCCESS:
            "User registered successfully",

        LOGIN_SUCCESS:
            "Login successful",

        INVALID_CREDENTIALS:
            "Invalid email or password",

        TOKEN_REQUIRED:
            "Authentication token is required",

        INVALID_TOKEN:
            "Invalid or expired token"
    },


    EMPLOYEE: {

        CREATED:
            "Employee created successfully",

        FETCHED:
            "Employees fetched successfully",

        SINGLE_FETCHED:
            "Employee fetched successfully",

        UPDATED:
            "Employee updated successfully",

        DELETED:
            "Employee deleted successfully",

        ANALYTICS_FETCHED:
            "Analytics fetched successfully",

        NOT_FOUND:
            "Employee not found"
    },


    COMMON: {

        SERVER_ERROR:
            "Internal server error",

        VALIDATION_ERROR:
            "Validation error",

        UNAUTHORIZED:
            "Unauthorized access"
    }

};


export default messages;