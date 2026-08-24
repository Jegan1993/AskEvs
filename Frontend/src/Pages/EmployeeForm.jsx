import { useEffect } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import { useDispatch } from "react-redux";

import {
  createEmployee,
  updateEmployee,
} from "../ReduxSlice/EmployeeSlice.jsx";

const employeeSchema = Yup.object({
  employeeName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .required("Employee name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  department: Yup.string().required("Department is required"),

  designation: Yup.string().required("Designation is required"),

  status: Yup.string()
    .oneOf(["Active", "Inactive"], "Invalid status")
    .required("Status is required"),

  joiningDate: Yup.date().required("Joining date is required"),
});

const EmployeeForm = ({ employee, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const isEdit = Boolean(employee);

  const initialValues = {
    employeeName: employee?.employeeName || "",

    email: employee?.email || "",

    department: employee?.department || "",

    designation: employee?.designation || "",

    status: employee?.status || "Active",

    joiningDate: employee?.joiningDate
      ? employee.joiningDate.substring(0, 10)
      : "",
  };

  return (
    <div
      className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            px-4
        "
    >
      <div
        className="
                w-full
                max-w-2xl
                rounded-xl
                bg-white
                p-6
                shadow-xl
                max-h-[90vh]
                overflow-y-auto
            "
      >
        <div
          className="
                    flex
                    items-center
                    justify-between
                    mb-6
                "
        >
          <h2
            className="
                        text-2xl
                        font-bold
                    "
          >
            {isEdit ? "Update Employee" : "Create Employee"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
                            text-2xl
                            text-gray-500
                            hover:text-gray-800
                        "
          >
            ×
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={employeeSchema}
          enableReinitialize
          onSubmit={async (values, { setSubmitting }) => {
            try {
              let result;

              if (isEdit) {
                result = await dispatch(
                  updateEmployee({
                    id: employee._id,
                    data: values,
                  }),
                );
              } else {
                result = await dispatch(createEmployee(values));
              }

              if (
                createEmployee.fulfilled.match(result) ||
                updateEmployee.fulfilled.match(result)
              ) {
                onSuccess();
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div
                className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-5
                            "
              >
                {/* Employee Name */}

                <div>
                  <label
                    className="
                                        block
                                        mb-2
                                        text-sm
                                        font-medium
                                    "
                  >
                    Employee Name
                  </label>

                  <Field
                    name="employeeName"
                    placeholder="Employee name"
                    className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray-300
                                            px-4
                                            py-3
                                            outline-none
                                            focus:border-blue-500
                                        "
                  />

                  <ErrorMessage
                    name="employeeName"
                    component="p"
                    className="
                                            mt-1
                                            text-sm
                                            text-red-500
                                        "
                  />
                </div>

                {/* Email */}

                <div>
                  <label
                    className="
                                        block
                                        mb-2
                                        text-sm
                                        font-medium
                                    "
                  >
                    Email
                  </label>

                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray-300
                                            px-4
                                            py-3
                                            outline-none
                                            focus:border-blue-500
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

                {/* Department */}

                <div>
                  <label
                    className="
                                        block
                                        mb-2
                                        text-sm
                                        font-medium
                                    "
                  >
                    Department
                  </label>

                  <Field
                    as="select"
                    name="department"
                    className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray-300
                                            px-4
                                            py-3
                                            outline-none
                                            focus:border-blue-500
                                        "
                  >
                    <option value="">Select Department</option>

                    <option value="IT">IT</option>

                    <option value="HR">HR</option>

                    <option value="Finance">Finance</option>

                    <option value="Marketing">Marketing</option>

                    <option value="Sales">Sales</option>
                  </Field>

                  <ErrorMessage
                    name="department"
                    component="p"
                    className="
                                            mt-1
                                            text-sm
                                            text-red-500
                                        "
                  />
                </div>

                {/* Designation */}

                <div>
                  <label
                    className="
                                        block
                                        mb-2
                                        text-sm
                                        font-medium
                                    "
                  >
                    Designation
                  </label>

                  <Field
                    name="designation"
                    placeholder="Designation"
                    className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray-300
                                            px-4
                                            py-3
                                            outline-none
                                            focus:border-blue-500
                                        "
                  />

                  <ErrorMessage
                    name="designation"
                    component="p"
                    className="
                                            mt-1
                                            text-sm
                                            text-red-500
                                        "
                  />
                </div>

                {/* Status */}

                <div>
                  <label
                    className="
                                        block
                                        mb-2
                                        text-sm
                                        font-medium
                                    "
                  >
                    Status
                  </label>

                  <Field
                    as="select"
                    name="status"
                    className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray-300
                                            px-4
                                            py-3
                                        "
                  >
                    <option value="Active">Active</option>

                    <option value="Inactive">Inactive</option>
                  </Field>

                  <ErrorMessage
                    name="status"
                    component="p"
                    className="
                                            mt-1
                                            text-sm
                                            text-red-500
                                        "
                  />
                </div>

                {/* Joining Date */}

                <div>
                  <label
                    className="
                                        block
                                        mb-2
                                        text-sm
                                        font-medium
                                    "
                  >
                    Joining Date
                  </label>

                  <Field
                    type="date"
                    name="joiningDate"
                    className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray-300
                                            px-4
                                            py-3
                                        "
                  />

                  <ErrorMessage
                    name="joiningDate"
                    component="p"
                    className="
                                            mt-1
                                            text-sm
                                            text-red-500
                                        "
                  />
                </div>
              </div>

              {/* Buttons */}

              <div
                className="
                                flex
                                justify-end
                                gap-3
                                mt-7
                            "
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="
                                        rounded-lg
                                        border
                                        px-5
                                        py-2.5
                                        hover:bg-gray-100
                                    "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                                        rounded-lg
                                        bg-blue-600
                                        px-5
                                        py-2.5
                                        text-white
                                        hover:bg-blue-700
                                        disabled:bg-blue-300
                                    "
                >
                  {isSubmitting
                    ? "Saving..."
                    : isEdit
                      ? "Update Employee"
                      : "Create Employee"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default EmployeeForm;
