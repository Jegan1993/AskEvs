import {
    useEffect,
    useState
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    getEmployees,
    deleteEmployee
} from "../ReduxSlice/EmployeeSlice.jsx";

import EmployeeTable
    from "./EmployeeTable.jsx";

import EmployeeForm
    from "./EmployeeForm.jsx";


const Employees = () => {

    const dispatch = useDispatch();


    const {
        employees,
        isLoading,
        error
    } = useSelector(
        state => state.employee
    );


    const [search, setSearch] =
        useState("");

    const [department, setDepartment] =
        useState("");

    const [status, setStatus] =
        useState("");


    const [showForm, setShowForm] =
        useState(false);

    const [selectedEmployee, setSelectedEmployee] =
        useState(null);


    const fetchEmployees = () => {

        dispatch(
            getEmployees({
                search,
                department,
                status,
                page: 1,
                limit: 10
            })
        );
    };


    useEffect(() => {

        fetchEmployees();

    }, [
        search,
        department,
        status
    ]);


    const handleCreate = () => {

        setSelectedEmployee(null);

        setShowForm(true);
    };


    const handleEdit = (employee) => {

        setSelectedEmployee(employee);

        setShowForm(true);
    };


    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this employee?"
            );


        if (!confirmed) {
            return;
        }


        const result =
            await dispatch(
                deleteEmployee(id)
            );


        if (
            deleteEmployee.fulfilled.match(
                result
            )
        ) {

            fetchEmployees();
        }
    };


    const handleFormSuccess = () => {

        setShowForm(false);

        setSelectedEmployee(null);

        fetchEmployees();
    };


    return (

        <div className="
            min-h-screen
            bg-gray-100
            p-4
            md:p-6
        ">

            {/* Header */}

            <div className="
                mb-6
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-center
                md:justify-between
            ">

                <div>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-800
                    ">
                        Employees
                    </h1>

                    <p className="
                        mt-1
                        text-gray-500
                    ">
                        Manage your employees
                    </p>

                </div>


                <button
                    onClick={handleCreate}
                    className="
                        rounded-lg
                        bg-blue-600
                        px-5
                        py-3
                        font-semibold
                        text-white
                        hover:bg-blue-700
                    "
                >
                    + Add Employee
                </button>

            </div>


            {/* Error */}

            {error && (

                <div className="
                    mb-5
                    rounded-lg
                    bg-red-50
                    p-4
                    text-red-600
                ">
                    {error}
                </div>

            )}


            {/* Filters */}

            <div className="
                mb-5
                grid
                grid-cols-1
                gap-4
                rounded-xl
                bg-white
                p-5
                shadow
                md:grid-cols-3
            ">

                {/* Search */}

                <input
                    type="text"
                    placeholder="
                        Search employee name or email
                    "
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="
                        rounded-lg
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        focus:border-blue-500
                    "
                />


                {/* Department */}

                <select
                    value={department}
                    onChange={(e) =>
                        setDepartment(
                            e.target.value
                        )
                    }
                    className="
                        rounded-lg
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        focus:border-blue-500
                    "
                >

                    <option value="">
                        All Departments
                    </option>

                    <option value="IT">
                        IT
                    </option>

                    <option value="HR">
                        HR
                    </option>

                    <option value="Finance">
                        Finance
                    </option>

                    <option value="Marketing">
                        Marketing
                    </option>

                    <option value="Sales">
                        Sales
                    </option>

                </select>


                {/* Status */}

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(
                            e.target.value
                        )
                    }
                    className="
                        rounded-lg
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        focus:border-blue-500
                    "
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="Active">
                        Active
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>

            </div>


            {/* Table */}

            <div className="
                overflow-hidden
                rounded-xl
                bg-white
                shadow
            ">

                <EmployeeTable
                    employees={employees}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

            </div>


            {/* Create / Update Modal */}

            {showForm && (

                <EmployeeForm
                    employee={
                        selectedEmployee
                    }
                    onClose={() => {

                        setShowForm(false);

                        setSelectedEmployee(null);

                    }}
                    onSuccess={
                        handleFormSuccess
                    }
                />

            )}

        </div>
    );
};


export default Employees;