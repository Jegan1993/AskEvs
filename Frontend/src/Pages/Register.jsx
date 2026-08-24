import { useState } from "react";

import {
    Formik,
    Form,
    Field,
    ErrorMessage
} from "formik";

import * as Yup from "yup";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    registerUser
} from "../ReduxSlice/AuthSlice.jsx";

import {
    Link,
    useNavigate
} from "react-router-dom";


const registerSchema = Yup.object({

    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must not exceed 50 characters")
        .required("Name is required"),

    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref("password")],
            "Passwords must match"
        )
        .required("Confirm password is required")
});


const Register = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const {
        isLoading,
        error
    } = useSelector(
        (state) => state.auth
    );


    const [successMessage, setSuccessMessage] =
        useState("");


    const handleSubmit = async (
        values,
        { resetForm }
    ) => {

        setSuccessMessage("");


        const registerData = {

            name: values.name,

            email: values.email,

            password: values.password
        };


        const result =
            await dispatch(
                registerUser(registerData)
            );


        if (
            registerUser.fulfilled.match(result)
        ) {

            setSuccessMessage(
                "Registration successful. Please login."
            );

            resetForm();


            setTimeout(() => {

                navigate("/login");

            }, 1500);
        }
    };


    return (

        <div className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gray-100
            px-4
            py-8
        ">

            <div className="
                w-full
                max-w-md
            ">

                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    validationSchema={
                        registerSchema
                    }
                    onSubmit={handleSubmit}
                >

                    {({ isSubmitting }) => (

                        <Form className="
                            bg-white
                            rounded-2xl
                            shadow-xl
                            p-8
                        ">

                            <div className="
                                text-center
                                mb-8
                            ">

                                <h1 className="
                                    text-3xl
                                    font-bold
                                    text-gray-800
                                ">
                                    Create Account
                                </h1>

                                <p className="
                                    text-gray-500
                                    mt-2
                                ">
                                    Employee Management
                                </p>

                            </div>
                            {error && (

                                <div className="
                                    mb-5
                                    rounded-lg
                                    bg-red-50
                                    border
                                    border-red-200
                                    p-3
                                    text-sm
                                    text-red-600
                                ">
                                    {error}
                                </div>

                            )}
                            {successMessage && (

                                <div className="
                                    mb-5
                                    rounded-lg
                                    bg-green-50
                                    border
                                    border-green-200
                                    p-3
                                    text-sm
                                    text-green-600
                                ">
                                    {successMessage}
                                </div>

                            )}
                            <div className="mb-5">

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Name
                                </label>


                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-300
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-blue-500
                                        focus:ring-2
                                        focus:ring-blue-100
                                    "
                                />


                                <ErrorMessage
                                    name="name"
                                    component="p"
                                    className="
                                        mt-1
                                        text-sm
                                        text-red-500
                                    "
                                />

                            </div>
                            <div className="mb-5">

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Email
                                </label>


                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-300
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-blue-500
                                        focus:ring-2
                                        focus:ring-blue-100
                                    "
                                />


                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="
                                        mt-1
                                        text-sm
                                        text-red-500
                                    "
                                />

                            </div>
                            <div className="mb-5">

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Password
                                </label>


                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-300
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-blue-500
                                        focus:ring-2
                                        focus:ring-blue-100
                                    "
                                />


                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="
                                        mt-1
                                        text-sm
                                        text-red-500
                                    "
                                />

                            </div>
                            <div className="mb-6">

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Confirm Password
                                </label>


                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-300
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-blue-500
                                        focus:ring-2
                                        focus:ring-blue-100
                                    "
                                />


                                <ErrorMessage
                                    name="confirmPassword"
                                    component="p"
                                    className="
                                        mt-1
                                        text-sm
                                        text-red-500
                                    "
                                />

                            </div>
                            <button
                                type="submit"
                                disabled={
                                    isSubmitting ||
                                    isLoading
                                }
                                className="
                                    w-full
                                    rounded-lg
                                    bg-blue-600
                                    px-4
                                    py-3
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-blue-700
                                    disabled:cursor-not-allowed
                                    disabled:bg-blue-400
                                "
                            >

                                {isLoading
                                    ? "Creating Account..."
                                    : "Create Account"}

                            </button>
                            <p className="
                                mt-6
                                text-center
                                text-sm
                                text-gray-600
                            ">

                                Already have an account?

                                <Link
                                    to="/login"
                                    className="
                                        ml-1
                                        font-semibold
                                        text-blue-600
                                        hover:text-blue-700
                                    "
                                >
                                    Login
                                </Link>

                            </p>

                        </Form>

                    )}

                </Formik>

            </div>

        </div>
    );
};
export default Register;