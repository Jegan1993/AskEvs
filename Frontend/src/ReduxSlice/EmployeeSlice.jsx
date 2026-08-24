import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Api from "../Api/Api.jsx";

export const getEmployees = createAsyncThunk(
  "employee/getEmployees",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();

      const response = await Api(`/employee?${query}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createEmployee = createAsyncThunk(
  "employee/create",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await Api("/employee", {
        method: "POST",

        body: JSON.stringify(employeeData),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await Api(`/employee/${id}`, {
        method: "PUT",

        body: JSON.stringify(data),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id, { rejectWithValue }) => {
    try {
      await Api(`/employee/${id}`, {
        method: "DELETE",
      });

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAnalytics = createAsyncThunk(
  "employee/analytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api("/employee/analytics");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  employees: [],

  pagination: {
    total: 0,

    page: 1,

    limit: 10,

    totalPages: 0,
  },

  analytics: null,

  isLoading: false,

  error: null,
};

const employeeSlice = createSlice({
  name: "employee",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })

      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false;

        state.employees = action.payload.employees;

        state.pagination = action.payload.pagination;
      })

      .addCase(getEmployees.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
      })

      // CREATE
      .addCase(createEmployee.fulfilled, (state) => {
        state.isLoading = false;
      })

      // UPDATE
      .addCase(updateEmployee.fulfilled, (state) => {
        state.isLoading = false;
      })

      // DELETE
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false;

        state.employees = state.employees.filter(
          (employee) => employee._id !== action.payload,
        );
      })

      // ANALYTICS
      .addCase(getAnalytics.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;

        state.analytics = action.payload;
      })

      .addCase(getAnalytics.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
      });
  },
});

export const { clearError } = employeeSlice.actions;

export default employeeSlice.reducer;
