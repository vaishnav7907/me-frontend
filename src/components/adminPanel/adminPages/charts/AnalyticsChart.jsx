import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const AnalyticsChart = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [getAnalysis, setGetAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const getDataAnalysis = async () => {
    try {
      setLoading(true);
      setError("");

      const adminToken = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getAdminAnalytics`,
        {
          params: {
            period: "monthly",
            year: selectedYear,
          },
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      setGetAnalysis(response.data);
    } catch (error) {
      console.error(
        "Error fetching analytics:",
        error.response?.data?.message || error.message,
      );

      setError(error.response?.data?.message || "Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataAnalysis();
  }, [selectedYear]);

  const analyticsData = getAnalysis?.analytics ?? [];
  const summary = getAnalysis?.summary;

  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const formatAxisCurrency = (value) => {
    if (Math.abs(value) >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }

    if (Math.abs(value) >= 1000) {
      return `₹${(value / 1000).toFixed(1)}k`;
    }

    return `₹${value}`;
  };

  const formatMonth = (label) => {
    const [year, month] = label.split("-");

    return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString(
      "en-IN",
      {
        month: "short",
      },
    );
  };

  const chartData = analyticsData.map((item) => ({
    ...item,
    month: formatMonth(item.label),
  }));

  const yearOptions = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index,
  );
  return (
    <div className="w-full bg-[#101318] border border-[#242932] rounded-2xl overflow-hidden">
      <div className="px-6 pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#626a76] mb-2">
            Store Analytics
          </p>

          <h2 className="text-xl font-semibold text-white">
            Revenue & Profit
          </h2>

          <p className="text-sm text-[#6f7783] mt-1">
            Monthly performance for {selectedYear}
          </p>
        </div>

        <div className="relative">
          <select
            value={selectedYear}
            onChange={(event) =>
              setSelectedYear(Number(event.target.value))
            }
            className="appearance-none bg-[#181c22] border border-[#292e36] text-white text-sm rounded-lg pl-4 pr-10 py-2.5 outline-none cursor-pointer hover:border-[#3a4049] transition"
          >
            {yearOptions.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737b87] pointer-events-none">
            ↓
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7 px-6">
        <div className="bg-[#15191f] border border-[#242932] rounded-xl p-4">
          <p className="text-[10px] uppercase tracking-[0.15em] text-[#626a76]">
            Total Revenue
          </p>

          <h3 className="text-xl font-semibold text-white mt-2">
            {formatCurrency(summary?.totalRevenue ?? 0)}
          </h3>

          <p className="text-[11px] text-[#626a76] mt-1">
            {selectedYear}
          </p>
        </div>

        <div className="bg-[#15191f] border border-[#242932] rounded-xl p-4">
          <p className="text-[10px] uppercase tracking-[0.15em] text-[#626a76]">
            Total Profit
          </p>

          <h3 className="text-xl font-semibold text-white mt-2">
            {summary?.totalProfit == null
              ? "Unavailable"
              : formatCurrency(summary.totalProfit)}
          </h3>

          <p className="text-[11px] text-[#626a76] mt-1">
            {summary?.profitAvailable === false
              ? "Some orders are missing valid cost prices"
              : `Gross profit · ${selectedYear}`}
          </p>
        </div>
      </div>

      <div className="w-full h-[463px] px-3 sm:px-6 mt-6 pb-6">
        {loading ? (
          <div className="h-full flex items-center justify-center text-sm text-[#737b87]">
            Loading analytics...
          </div>
        ) : error ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm text-red-400">{error}</p>

            <button
              onClick={getDataAnalysis}
              className="px-4 py-2 rounded-lg border border-[#292e36] text-sm text-white hover:bg-[#181c22] transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 5, bottom: 5 }}
            >
              <CartesianGrid
                stroke="#242932"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#626a76", fontSize: 11 }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#626a76", fontSize: 11 }}
                tickFormatter={formatAxisCurrency}
                width={65}
              />

              <Tooltip
                cursor={{
                  stroke: "#343a44",
                  strokeWidth: 1,
                }}
                contentStyle={{
                  backgroundColor: "#15191f",
                  border: "1px solid #292e36",
                  borderRadius: "10px",
                  color: "#ffffff",
                }}
                labelStyle={{
                  color: "#ffffff",
                  marginBottom: "6px",
                }}
                formatter={(value, name) => [
                  value == null ? "Unavailable" : formatCurrency(value),
                  name,
                ]}
                labelFormatter={(label, payload) =>
                  payload?.[0]?.payload?.label ?? label
                }
              />

              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#ffffff"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                  strokeWidth: 2,
                  stroke: "#101318",
                }}
              />

              <Line
                type="monotone"
                dataKey="profit"
                name="Profit"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
                connectNulls={false}
                activeDot={{
                  r: 5,
                  strokeWidth: 2,
                  stroke: "#101318",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChart;
