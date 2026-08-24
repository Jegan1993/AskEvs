import { useEffect } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../ReduxSlice/AuthSlice.jsx";

import { Link, useNavigate } from "react-router-dom";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, error, token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [token, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(loginUser(values));

      if (loginUser.fulfilled.match(result)) {
        navigate("/dashboard", {
          replace: true,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gray-100
            px-4
        "
    >
      <div
        className="
                w-full
                max-w-md
            "
      >
        <div
          className="
                    rounded-2xl
                    bg-white
                    p-8
                    shadow-xl
                "
        >
          <div
            className="
                        mb-8
                        text-center
                    "
          >
            <h1
              className="
                            text-3xl
                            font-bold
                            text-gray-800
                        "
            >
              Welcome Back
            </h1>

            <p
              className="
                            mt-2
                            text-gray-500
                        "
            >
              Login to Employee Management
            </p>
          </div>
          {error && (
            <div
              className="
                            mb-5
                            rounded-lg
                            border
                            border-red-200
                            bg-red-50
                            p-3
                            text-sm
                            text-red-600
                        "
            >
              {error}
            </div>
          )}

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div
                  className="
                                    mb-5
                                "
                >
                  <label
                    htmlFor="email"
                    className="
                                            mb-2
                                            block
                                            text-sm
                                            font-medium
                                            text-gray-700
                                        "
                  >
                    Email
                  </label>

                  <Field
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray-300
                                            px-4
                                            py-3
                                            outline-none
                                            transition
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

                <div
                  className="
                                    mb-6
                                "
                >
                  <label
                    htmlFor="password"
                    className="
                                            mb-2
                                            block
                                            text-sm
                                            font-medium
                                            text-gray-700
                                        "
                  >
                    Password
                  </label>

                  <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray-300
                                            px-4
                                            py-3
                                            outline-none
                                            transition
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
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
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
                  {isLoading || isSubmitting ? "Logging in..." : "Login"}
                </button>

                <p
                  className="
                                    mt-6
                                    text-center
                                    text-sm
                                    text-gray-600
                                "
                >
                  Don't have an account?
                  <Link
                    to="/register"
                    className="
                                            ml-1
                                            font-semibold
                                            text-blue-600
                                            hover:text-blue-700
                                        "
                  >
                    Register
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
