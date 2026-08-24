import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import apiRequest from "../Api/Api.jsx";


export const loginUser =
    createAsyncThunk(
        "auth/login",
        async (
            loginData,
            { rejectWithValue }
        ) => {

            try {

                const response =
                    await apiRequest(
                        "/auth/login",
                        {
                            method: "POST",
                            body: JSON.stringify(
                                loginData
                            )
                        }
                    );


                localStorage.setItem(
                    "token",
                    response.data.token
                );


                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        response.data.user
                    )
                );


                return response.data;

            } catch (error) {

                return rejectWithValue(
                    error.message
                );
            }
        }
    );


export const registerUser =
    createAsyncThunk(
        "auth/register",
        async (
            registerData,
            { rejectWithValue }
        ) => {

            try {

                const response =
                    await apiRequest(
                        "/auth/register",
                        {
                            method: "POST",
                            body: JSON.stringify(
                                registerData
                            )
                        }
                    );


                return response.data;

            } catch (error) {

                return rejectWithValue(
                    error.message
                );
            }
        }
    );


const token =
    localStorage.getItem("token");

const storedUser =
    localStorage.getItem("user");


const initialState = {

    token: token || null,

    user:
        storedUser
            ? JSON.parse(storedUser)
            : null,

    isLoading: false,

    error: null
};


const authSlice =
    createSlice({

        name: "auth",

        initialState,

        reducers: {

            logout: (state) => {

                state.token = null;

                state.user = null;

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );
            },

            clearError: (state) => {

                state.error = null;
            }

        },


        extraReducers: (builder) => {

            builder

                .addCase(
                    loginUser.pending,
                    (state) => {

                        state.isLoading = true;

                        state.error = null;
                    }
                )

                .addCase(
                    loginUser.fulfilled,
                    (state, action) => {

                        state.isLoading = false;

                        state.token =
                            action.payload.token;

                        state.user =
                            action.payload.user;
                    }
                )

                .addCase(
                    loginUser.rejected,
                    (state, action) => {

                        state.isLoading = false;

                        state.error =
                            action.payload;
                    }
                )


                .addCase(
                    registerUser.pending,
                    (state) => {

                        state.isLoading = true;

                        state.error = null;
                    }
                )

                .addCase(
                    registerUser.fulfilled,
                    (state) => {

                        state.isLoading = false;
                    }
                )

                .addCase(
                    registerUser.rejected,
                    (state, action) => {

                        state.isLoading = false;

                        state.error =
                            action.payload;
                    }
                );
        }

    });


export const {
    logout,
    clearError
} = authSlice.actions;


export default authSlice.reducer;