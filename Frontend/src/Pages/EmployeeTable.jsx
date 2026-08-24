import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const EmployeeTable = ({
  employees = [],
  isLoading = false,

  pagination = {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },

  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  onReset,
}) => {
  const [deleteEmployee, setDeleteEmployee] = useState(null);

  const [currentPage, setCurrentPage] = useState(pagination.page || 1);

  const [rowsPerPage, setRowsPerPage] = useState(pagination.limit || 10);

  useEffect(() => {
    setCurrentPage(pagination.page || 1);
  }, [pagination.page]);

  useEffect(() => {
    setRowsPerPage(pagination.limit || 10);
  }, [pagination.limit]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handleRowsPerPageChange = (newLimit, page) => {
    setRowsPerPage(newLimit);
    setCurrentPage(page);

    if (onRowsPerPageChange) {
      onRowsPerPageChange(newLimit, page);
    }
  };

  const handleReset = () => {
    setCurrentPage(1);
    setRowsPerPage(10);

    if (onReset) {
      onReset();
    }
  };

  const handleDeleteClick = (employee) => {
    setDeleteEmployee(employee);
  };

  const handleDeleteConfirm = () => {
    if (!deleteEmployee) {
      return;
    }

    if (onDelete) {
      onDelete(deleteEmployee._id);
    }

    setDeleteEmployee(null);
  };

  const handleDeleteCancel = () => {
    setDeleteEmployee(null);
  };

  const columns = [
    {
      name: "Employee Name",
      selector: (row) => row.employeeName || "-",
      sortable: true,
    },

    {
      name: "Email",
      selector: (row) => row.email || "-",
      sortable: true,
    },

    {
      name: "Department",
      selector: (row) => row.department || "-",
      sortable: true,
    },

    {
      name: "Designation",
      selector: (row) => row.designation || "-",
      sortable: true,
    },

    {
      name: "Status",
      cell: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            row.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status || "-"}
        </span>
      ),
      sortable: true,
    },

    {
      name: "Joining Date",
      selector: (row) =>
        row.joiningDate ? new Date(row.joiningDate).toLocaleDateString() : "-",
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit && onEdit(row)}
            className="rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-700 transition hover:bg-blue-200"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => handleDeleteClick(row)}
            className="rounded-md bg-red-100 px-3 py-1 text-sm text-red-700 transition hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Employee List</h3>

          <p className="mt-1 text-sm text-gray-500">Manage your employees</p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Reset
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <DataTable
          columns={columns}
          data={employees}
          progressPending={isLoading}
          pagination
          paginationServer
          paginationTotalRows={pagination.total}
          paginationDefaultPage={currentPage}
          paginationPerPage={rowsPerPage}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          paginationRowsPerPageOptions={[10, 20, 50]}
          highlightOnHover
          pointerOnHover
          responsive
          striped
          noDataComponent={
            <div className="py-10 text-gray-500">No employees found</div>
          }
        />
      </div>

      {deleteEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Delete Employee
              </h2>

              <button
                type="button"
                onClick={handleDeleteCancel}
                className="text-2xl text-gray-400 transition hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="mt-4">
              <p className="text-gray-600">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900">
                  {deleteEmployee.employeeName}
                </span>
                ?
              </p>

              <p className="mt-2 text-sm text-red-600">
                This action cannot be undone.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleDeleteCancel}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
