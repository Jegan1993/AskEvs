import { useState } from "react";
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
}) => {
  const [deleteEmployee, setDeleteEmployee] = useState(null);

  const handleDeleteClick = (employee) => {
    setDeleteEmployee(employee);
  };

  const handleDeleteConfirm = () => {
    if (!deleteEmployee) {
      return;
    }

    onDelete(deleteEmployee._id);

    setDeleteEmployee(null);
  };

  const handleDeleteCancel = () => {
    setDeleteEmployee(null);
  };

  const columns = [
    {
      name: "Employee Name",

      selector: (row) => row.employeeName,

      sortable: true,
    },

    {
      name: "Email",

      selector: (row) => row.email,

      sortable: true,
    },

    {
      name: "Department",

      selector: (row) => row.department,

      sortable: true,
    },

    {
      name: "Designation",

      selector: (row) => row.designation,

      sortable: true,
    },

    {
      name: "Status",

      cell: (row) => (
        <span
          className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${
                          row.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                    `}
        >
          {row.status}
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
            onClick={() => onEdit(row)}
            className="
                            rounded-md
                            bg-blue-100
                            px-3
                            py-1
                            text-sm
                            text-blue-700
                            hover:bg-blue-200
                        "
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => handleDeleteClick(row)}
            className="
                            rounded-md
                            bg-red-100
                            px-3
                            py-1
                            text-sm
                            text-red-700
                            hover:bg-red-200
                        "
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={employees}
        progressPending={isLoading}
        pagination
        paginationServer
        paginationTotalRows={pagination.total}
        paginationDefaultPage={pagination.page}
        paginationPerPage={pagination.limit}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onRowsPerPageChange}
        paginationRowsPerPageOptions={[10, 20, 50]}
        highlightOnHover
        pointerOnHover
        responsive
        striped
        noDataComponent={
          <div
            className="
                        py-10
                        text-gray-500
                    "
          >
            No employees found
          </div>
        }
      />

      {/* Delete Confirmation Modal */}

      {deleteEmployee && (
        <div
          className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/50
                        p-4
                    "
        >
          <div
            className="
                            w-full
                            max-w-md
                            rounded-xl
                            bg-white
                            p-6
                            shadow-2xl
                        "
          >
            {/* Modal Header */}

            <div
              className="
                            flex
                            items-center
                            justify-between
                        "
            >
              <h2
                className="
                                text-xl
                                font-semibold
                                text-gray-900
                            "
              >
                Delete Employee
              </h2>

              <button
                type="button"
                onClick={handleDeleteCancel}
                className="
                                    text-2xl
                                    text-gray-400
                                    hover:text-gray-600
                                "
              >
                ×
              </button>
            </div>

            {/* Modal Content */}

            <div className="mt-4">
              <p
                className="
                                text-gray-600
                            "
              >
                Are you sure you want to delete{" "}
                <span
                  className="
                                    font-semibold
                                    text-gray-900
                                "
                >
                  {deleteEmployee.employeeName}
                </span>
                ?
              </p>

              <p
                className="
                                mt-2
                                text-sm
                                text-red-600
                            "
              >
                This action cannot be undone.
              </p>
            </div>

            {/* Modal Actions */}

            <div
              className="
                            mt-6
                            flex
                            justify-end
                            gap-3
                        "
            >
              <button
                type="button"
                onClick={handleDeleteCancel}
                className="
                                    rounded-md
                                    border
                                    border-gray-300
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    hover:bg-gray-100
                                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="
                                    rounded-md
                                    bg-red-600
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    text-white
                                    hover:bg-red-700
                                "
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
