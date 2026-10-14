import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FiChevronDown } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";

const AnalyticsCompleteChart = () => {
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedMetric, setSelectedMetric] = useState("all");
  const [getAnalysis, setGetAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getDataAnalysis = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const adminToken = localStorage.getItem("token");

      if (!adminToken) {
        throw new Error("Admin authentication required. Please log in again.");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getAdminAnalytics`,
        {
          params: {
            period: selectedPeriod,
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

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch analytics",
      );

      setGetAnalysis(null);
    } finally {
      setLoading(false);
    }
  }, [selectedPeriod, selectedYear]);

  useEffect(() => {
    getDataAnalysis();
  }, [getDataAnalysis]);

  const analyticsData = useMemo(
    () => getAnalysis?.analytics ?? [],
    [getAnalysis],
  );

  const summary = getAnalysis?.summary;

  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const formatAxisCurrency = (value) => {
    if (Math.abs(value) >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    }

    if (Math.abs(value) >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }

    if (Math.abs(value) >= 1000) {
      return `₹${(value / 1000).toFixed(1)}k`;
    }

    return `₹${value}`;
  };

  const formatLabel = (label) => {
    if (!label) return "";

    const value = String(label);
    const match = value.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);

    if (!match) return value;

    const [, year, month, day] = match;

    const date = new Date(
      Number(year),
      Number(month) - 1,
      day ? Number(day) : 1,
    );

    if (selectedPeriod === "yearly") {
      return year;
    }

    if (selectedPeriod === "daily") {
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });
    }

    return date.toLocaleDateString("en-IN", {
      month: "short",
    });
  };

  const chartData = useMemo(
    () =>
      analyticsData.map((item) => ({
        ...item,
        chartLabel: formatLabel(item.label),
      })),
    [analyticsData, selectedPeriod],
  );

  const metricOptions = [
    { value: "all", label: "All Metrics" },
    { value: "revenue", label: "Revenue" },
    { value: "profit", label: "Profit" },
    { value: "loss", label: "Loss" },
  ];

  const periodOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const yearOptions = Array.from(
    { length: currentYear - 2021 },
    (_, index) => currentYear - index,
  );

  const metrics = [
    { key: "revenue", name: "Revenue", color: "#ffffff" },
    { key: "profit", name: "Profit", color: "#8b5cf6" },
    { key: "loss", name: "Loss", color: "#f87171" },
  ];

  const visibleMetrics =
    selectedMetric === "all"
      ? metrics
      : metrics.filter((metric) => metric.key === selectedMetric);

  const getTotal = (key) => {
    const summaryKey = {
      revenue: "totalRevenue",
      profit: "totalProfit",
      loss: "totalLoss",
    }[key];

    const summaryValue = summary?.[summaryKey];

    if (summaryValue != null && Number.isFinite(Number(summaryValue))) {
      return Number(summaryValue);
    }

    if (!analyticsData.length) return null;

    if (key === "profit" && summary?.profitAvailable === false) {
      return null;
    }

    const values = analyticsData.map((item) => item[key]);

    if (
      values.some((value) => value == null || !Number.isFinite(Number(value)))
    ) {
      return null;
    }

    return values.reduce((total, value) => total + Number(value), 0);
  };

  const summaryCards = [
    {
      label: "Total Revenue",
      value: getTotal("revenue"),
      color: "text-white",
    },
    {
      label: "Total Profit",
      value: getTotal("profit"),
      color: "text-purple-400",
    },
    {
      label: "Total Loss",
      value: getTotal("loss"),
      color: "text-red-400",
    },
  ];

  const periodLabel =
    periodOptions.find((period) => period.value === selectedPeriod)?.label ??
    "Monthly";

    

  return (
    <div className="w-full px-3 py-3">
      <div className="overflow-hidden rounded-2xl border border-[#242932] bg-[#101318]">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.10em] text-neutral-500">
                Performance Analytics
              </p>

              <h3 className="text-lg font-semibold text-white">
                Complete Business Performance
              </h3>

              <p className="text-xs text-neutral-500">
                Revenue, profit and loss across your business
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#292f36] bg-[#0b0e10] text-white">
                <LuFilter size={20} />
              </div>

              <div className="hidden h-10 w-px bg-white/20 sm:block" />

              <div className="relative w-full sm:w-[150px]">
                <select
                  value={selectedMetric}
                  onChange={(event) => setSelectedMetric(event.target.value)}
                  aria-label="Select analytics metric"
                  className="h-10 w-full appearance-none rounded-lg border border-[#292f36] bg-[#0b0e10] px-3 pr-9 text-sm text-gray-300 outline-none transition hover:border-gray-500 focus:border-purple-500"
                >
                  {metricOptions.map((metric) => (
                    <option key={metric.value} value={metric.value}>
                      {metric.label}
                    </option>
                  ))}
                </select>

                <FiChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>

              <div className="relative w-full sm:w-[150px]">
                <select
                  value={selectedPeriod}
                  onChange={(event) => setSelectedPeriod(event.target.value)}
                  aria-label="Select analytics period"
                  className="h-10 w-full appearance-none rounded-lg border border-[#292f36] bg-[#0b0e10] px-3 pr-9 text-sm text-gray-300 outline-none transition hover:border-gray-500 focus:border-purple-500"
                >
                  {periodOptions.map((period) => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>

                <FiChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>

              <div className="relative w-full sm:w-[120px]">
                <select
                  value={selectedYear}
                  onChange={(event) =>
                    setSelectedYear(Number(event.target.value))
                  }
                  aria-label="Select analytics year"
                  className="h-10 w-full appearance-none rounded-lg border border-[#292f36] bg-[#0b0e10] px-3 pr-9 text-sm text-gray-300 outline-none transition hover:border-gray-500 focus:border-purple-500"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <FiChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-[#242932] bg-[#15191f] p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#626a76]">
                  {card.label}
                </p>

                <h3 className={`mt-2 text-xl font-semibold ${card.color}`}>
                  {loading
                    ? "Loading..."
                    : card.value == null
                      ? "Unavailable"
                      : formatCurrency(card.value)}
                </h3>

                <p className="mt-1 text-[11px] text-[#626a76]">
                  {periodLabel} performance · {selectedYear}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-medium text-white">
                  {selectedMetric === "all"
                    ? "Revenue, Profit & Loss"
                    : `${metricOptions.find((item) => item.value === selectedMetric)?.label} Performance`}
                </h4>

                <p className="mt-1 text-xs text-[#626a76]">
                  {periodLabel} analytics for {selectedYear}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {visibleMetrics.map((metric) => (
                  <div key={metric.key} className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: metric.color }}
                    />

                    <span className="text-xs text-gray-400">{metric.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[320px] w-full sm:h-[380px]">
              {loading ? (
                <div className="flex h-full items-center justify-center text-sm text-[#737b87]">
                  Loading analytics...
                </div>
              ) : error ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <p className="max-w-md text-sm text-red-400">{error}</p>

                  <button
                    type="button"
                    onClick={getDataAnalysis}
                    className="rounded-lg border border-[#292e36] px-4 py-2 text-sm text-white transition hover:bg-[#181c22]"
                  >
                    Try Again
                  </button>
                </div>
              ) : chartData.length === 0 ? (
                <div className="flex h-full items-center justify-center text-sm text-[#737b87]">
                  No analytics data available for {selectedYear}.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      stroke="#242932"
                      strokeDasharray="4 4"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="chartLabel"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#626a76", fontSize: 11 }}
                      dy={10}
                      minTickGap={selectedPeriod === "daily" ? 20 : 10}
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
                      labelFormatter={(_, payload) =>
                        payload?.[0]?.payload?.label ?? ""
                      }
                    />

                    {visibleMetrics.map((metric) => (
                      <Line
                        key={metric.key}
                        type="monotone"
                        dataKey={metric.key}
                        name={metric.name}
                        stroke={metric.color}
                        strokeWidth={2}
                        dot={false}
                        connectNulls={false}
                        activeDot={{
                          r: 5,
                          strokeWidth: 2,
                          stroke: "#101318",
                        }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCompleteChart;
