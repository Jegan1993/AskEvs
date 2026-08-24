import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getAnalytics } from "../ReduxSlice/EmployeeSlice.jsx";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();

  const analytics = useSelector((state) => state.employee.analytics);

  useEffect(() => {
    dispatch(getAnalytics());
  }, [dispatch]);

  if (!analytics) {
    return <div className="p-6">Loading analytics...</div>;
  }

  const departmentData = analytics.departmentWiseCount.map((item) => ({
    name: item._id,
    count: item.count,
  }));

  const statusData = analytics.statusDistribution.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  const monthlyData = analytics.monthlyJoinedEmployees.map((item) => ({
    month: `${item._id.year}-${item._id.month}`,

    count: item.count,
  }));

  return (
    <div
      className="
            min-h-screen
            bg-gray-100
            p-6
        "
    >
      <h1
        className="
                text-3xl
                font-bold
                mb-6
            "
      >
        Dashboard
      </h1>

      {/* Cards */}

      <div
        className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-4
                gap-5
                mb-8
            "
      >
        <div
          className="
                    bg-white
                    p-6
                    rounded-xl
                    shadow
                "
        >
          <p
            className="
                        text-gray-500
                    "
          >
            Total Employees
          </p>

          <h2
            className="
                        text-3xl
                        font-bold
                    "
          >
            {analytics.totalEmployees}
          </h2>
        </div>

        <div
          className="
                    bg-white
                    p-6
                    rounded-xl
                    shadow
                "
        >
          <p
            className="
                        text-gray-500
                    "
          >
            Active Employees
          </p>

          <h2
            className="
                        text-3xl
                        font-bold
                    "
          >
            {analytics.activeEmployees}
          </h2>
        </div>
      </div>

      {/* Department */}

      <div
        className="
                bg-white
                p-6
                rounded-xl
                shadow
                mb-6
            "
      >
        <h2
          className="
                    text-xl
                    font-bold
                    mb-4
                "
        >
          Department-wise Employees
        </h2>

        <BarChart width={700} height={300} data={departmentData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" />
        </BarChart>
      </div>

      {/* Status */}

      <div
        className="
                bg-white
                p-6
                rounded-xl
                shadow
                mb-6
            "
      >
        <h2
          className="
                    text-xl
                    font-bold
                    mb-4
                "
        >
          Employee Status
        </h2>

        <PieChart width={400} height={300}>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {statusData.map((_, index) => (
              <Cell key={index} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </div>

      {/* Monthly */}

      <div
        className="
                bg-white
                p-6
                rounded-xl
                shadow
            "
      >
        <h2
          className="
                    text-xl
                    font-bold
                    mb-4
                "
        >
          Monthly Joined Employees
        </h2>

        <LineChart width={700} height={300} data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line type="monotone" dataKey="count" />
        </LineChart>
      </div>
    </div>
  );
};

export default Dashboard;
