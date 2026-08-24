import { configureStore } from "@reduxjs/toolkit";

import authReducer
    from "../ReduxSlice/AuthSlice.jsx";

import employeeReducer
    from "../ReduxSlice/EmployeeSlice.jsx";


const store = configureStore({

    reducer: {

        auth: authReducer,

        employee: employeeReducer
    }

});
export default store;