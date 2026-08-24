import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getEmployees, deleteEmployee } from "../ReduxSlice/EmployeeSlice.jsx";

import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeForm from "./EmployeeForm.jsx";

const Employees = () => {
  const dispatch = useDispatch();

  const { employees, isLoading, error, pagination } = useSelector(
    (state) => state.employee,
  );

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = (
    currentPage = 1,
    currentLimit = 10,
    currentSearch = "",
    currentDepartment = "",
    currentStatus = "",
  ) => {
    dispatch(
      getEmployees({
        search: currentSearch,
        department: currentDepartment,
        status: currentStatus,
        page: currentPage,
        limit: currentLimit,
      }),
    );
  };

  useEffect(() => {
    setPage(1);

    fetchEmployees(1, limit, search, department, status);
  }, [search, department, status]);

  const handlePageChange = (newPage) => {
    setPage(newPage);

    fetchEmployees(newPage, limit, search, department, status);
  };

  const handleRowsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);

    fetchEmployees(1, newLimit, search, department, status);
  };

  const handleReset = () => {
    setSearch("");
    setDepartment("");
    setStatus("");

    setPage(1);
    setLimit(10);

    fetchEmployees(1, 10, "", "", "");
  };

  const handleCreate = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) {
      return;
    }

    const result = await dispatch(deleteEmployee(id));

    if (deleteEmployee.fulfilled.match(result)) {
      fetchEmployees(page, limit, search, department, status);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedEmployee(null);

    fetchEmployees(page, limit, search, department, status);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Employees</h1>

          <p className="mt-1 text-gray-500">Manage your employees</p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Add Employee
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="mb-5 grid grid-cols-1 gap-4 rounded-xl bg-white p-5 shadow md:grid-cols-3">
        <input
          type="text"
          placeholder="Search employee name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <EmployeeTable
          employees={employees}
          isLoading={isLoading}
          pagination={{
            total: pagination?.total || 0,
            page: page,
            limit: limit,
            totalPages: pagination?.totalPages || 0,
          }}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReset={handleReset}
        />
      </div>

      {showForm && (
        <EmployeeForm
          employee={selectedEmployee}
          onClose={() => {
            setShowForm(false);
            setSelectedEmployee(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default Employees;
