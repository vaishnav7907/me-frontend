import React, { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FiActivity,
  FiDollarSign,
  FiFilter,
  FiPackage,
  FiPercent,
  FiShoppingBag,
  FiTrendingDown,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { FiSearch, FiChevronDown, FiEye } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
const AnalyticsCompleteChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedMetric, setSelectedMetric] = useState("all");
  const businessStartYear = 2022;
  const currentYear = 2026;
  const yearlyData = [
    {
      year: 2022,
      revenue: 1250000,
      profit: 285000,
      loss: 72000,
      orders: 1180,
      customers: 840,
      productsSold: 1640,
    },
    {
      year: 2023,
      revenue: 1680000,
      profit: 410000,
      loss: 85000,
      orders: 1650,
      customers: 1240,
      productsSold: 2310,
    },
    {
      year: 2024,
      revenue: 2150000,
      profit: 570000,
      loss: 92000,
      orders: 2240,
      customers: 1780,
      productsSold: 3180,
    },
    {
      year: 2025,
      revenue: 2380000,
      profit: 640000,
      loss: 108000,
      orders: 2460,
      customers: 2040,
      productsSold: 3520,
    },
    {
      year: 2026,
      revenue: 2745000,
      profit: 780000,
      loss: 95000,
      orders: 2890,
      customers: 2410,
      productsSold: 4210,
    },
  ];
  const periodData = {
    daily: [
      { label: "Mon", revenue: 18500, profit: 5200, loss: 1200, orders: 34 },
      { label: "Tue", revenue: 21300, profit: 6800, loss: 900, orders: 41 },
      { label: "Wed", revenue: 19800, profit: 5900, loss: 1400, orders: 38 },
      { label: "Thu", revenue: 24600, profit: 7600, loss: 1100, orders: 46 },
      { label: "Fri", revenue: 28500, profit: 9200, loss: 1600, orders: 52 },
      { label: "Sat", revenue: 32100, profit: 10800, loss: 1300, orders: 61 },
      { label: "Sun", revenue: 29800, profit: 9700, loss: 1800, orders: 57 },
    ],
    weekly: [
      { label: "W1", revenue: 125000, profit: 32000, loss: 8500, orders: 280 },
      { label: "W2", revenue: 142000, profit: 38000, loss: 7200, orders: 315 },
      { label: "W3", revenue: 156000, profit: 42000, loss: 9100, orders: 342 },
      { label: "W4", revenue: 149000, profit: 39500, loss: 6800, orders: 329 },
      { label: "W5", revenue: 172000, profit: 48000, loss: 7500, orders: 374 },
      { label: "W6", revenue: 185000, profit: 53000, loss: 8200, orders: 401 },
      { label: "W7", revenue: 194000, profit: 57000, loss: 6900, orders: 425 },
      { label: "W8", revenue: 210000, profit: 64000, loss: 7800, orders: 462 },
    ],
    monthly: [
      { label: "Jan", revenue: 120000, profit: 28000, loss: 8500, orders: 260 },
      { label: "Feb", revenue: 135000, profit: 32000, loss: 7200, orders: 285 },
      { label: "Mar", revenue: 150000, profit: 40000, loss: 9100, orders: 315 },
      { label: "Apr", revenue: 142000, profit: 35000, loss: 6800, orders: 298 },
      { label: "May", revenue: 165000, profit: 45000, loss: 7500, orders: 342 },
      { label: "Jun", revenue: 180000, profit: 52000, loss: 8200, orders: 378 },
      { label: "Jul", revenue: 195000, profit: 58000, loss: 6900, orders: 405 },
      { label: "Aug", revenue: 210000, profit: 65000, loss: 7800, orders: 432 },
      { label: "Sep", revenue: 225000, profit: 72000, loss: 8400, orders: 468 },
      { label: "Oct", revenue: 240000, profit: 80000, loss: 7600, orders: 492 },
      { label: "Nov", revenue: 280000, profit: 95000, loss: 9200, orders: 568 },
      {
        label: "Dec",
        revenue: 340000,
        profit: 120000,
        loss: 10500,
        orders: 684,
      },
    ],
    yearly: yearlyData.map((item) => ({
      label: String(item.year),
      revenue: item.revenue,
      profit: item.profit,
      loss: item.loss,
      orders: item.orders,
    })),
  };
  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      category: "Shirts",
      sold: 1240,
      revenue: 97960,
      profit: 31200,
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      category: "Pants",
      sold: 1085,
      revenue: 107415,
      profit: 35800,
    },
    {
      id: 3,
      name: "Oversized T-Shirt",
      category: "T-Shirts",
      sold: 980,
      revenue: 44100,
      profit: 16400,
    },
    {
      id: 4,
      name: "Essential Hoodie",
      category: "T-Shirts",
      sold: 865,
      revenue: 82175,
      profit: 28900,
    },
    {
      id: 5,
      name: "Tailored Blazer",
      category: "Jackets",
      sold: 720,
      revenue: 128880,
      profit: 42700,
    },
    {
      id: 6,
      name: "Leather Jacket",
      category: "Jackets",
      sold: 615,
      revenue: 122385,
      profit: 39600,
    },
    {
      id: 7,
      name: "Classic Chinos",
      category: "Pants",
      sold: 580,
      revenue: 57420,
      profit: 18900,
    },
    {
      id: 8,
      name: "Premium Polo",
      category: "Shirts",
      sold: 510,
      revenue: 40290,
      profit: 14100,
    },
  ];
  const ageGroups = [
    {
      age: "18–24",
      customers: 420,
      orders: 620,
      revenue: 386000,
      averageOrder: 623,
    },
    {
      age: "25–34",
      customers: 920,
      orders: 1420,
      revenue: 945000,
      averageOrder: 665,
    },
    {
      age: "35–44",
      customers: 670,
      orders: 1040,
      revenue: 812000,
      averageOrder: 781,
    },
    {
      age: "45–54",
      customers: 290,
      orders: 470,
      revenue: 398000,
      averageOrder: 847,
    },
    {
      age: "55+",
      customers: 110,
      orders: 180,
      revenue: 142000,
      averageOrder: 789,
    },
  ];
  const categories = [
    { name: "Shirts", sold: 1750, revenue: 138250, percentage: 31 },
    { name: "Pants", sold: 1665, revenue: 164835, percentage: 29 },
    { name: "T-Shirts", sold: 1845, revenue: 126275, percentage: 27 },
    { name: "Jackets", sold: 1335, revenue: 251265, percentage: 13 },
  ];
  const metricData = {
    all: {
      title: "Complete Business Performance",
      description:
        "Revenue, profit and loss across the complete business lifecycle",
    },
    revenue: {
      title: "Revenue Performance",
      description: "Track the growth and strength of your business revenue",
    },
    profit: {
      title: "Profit Performance",
      description:
        "Understand how efficiently revenue is converted into profit",
    },
    loss: {
      title: "Loss Performance",
      description: "Monitor losses and identify areas requiring attention",
    },
  };
  return (
    <div className="px-3 py-3">
      <div>
        <div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                performance analytics
              </p>

              <h3 className="text-white text-lg">
                Complete Business Performance
              </h3>
              <p className="text-neutral-500 text-xs">
                Revenue, profit and loss accross the complete business lifecycle
              </p>
            </div>

            <div className="flex gap-3">
              <div className="h-10 w-10 flex justify-center items-center rounded-lg border border-[#292f36] bg-[#0b0e10] text-white ">
                <LuFilter size={20} />
              </div>
              <div className="w-[1px] h-10 bg-white/20 text-white/70" />
              <div className=" relative w-[150px]">
                <select
                  name=""
                  id=""
                  className="h-10 w-full appearance-none rounded-lg border border-[#292f36] bg-[#0b0e10] px-3 pr-9 text-sm text-gray-400 outline-none focus:border-gray-500"
                >
                  <option value="">All Metrics</option>
                  <option value="">Revenue</option>
                  <option value="">Profit</option>
                  <option value="">Loss</option>
                </select>
                <FiChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={15}
                />
              </div>

              <div className="w-[1px] h-10 bg-white/20 text-white/70" />
              <div className=" relative w-[150px]">
                <select
                  name=""
                  id=""
                  className="h-10 w-full appearance-none rounded-lg border border-[#292f36] bg-[#0b0e10] px-3 pr-9 text-sm text-gray-400 outline-none focus:border-gray-500"
                >
                  <option value="">Daily</option>
                  <option value="">Weekly</option>
                  <option value="">Monthly</option>
                  <option value="">Yearly</option>
                </select>
                <FiChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={15}
                />
              </div>
            </div>
          </div>
          {/* graph */}
          <div className="mt-10">
            <div className="w-full h-[380px]  px-3 sm:px-6 mt-6 pb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
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
                    tick={{
                      fill: "#626a76",
                      fontSize: 11,
                    }}
                    dy={10}
                  />

                  {/* Y AXIS */}
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#626a76",
                      fontSize: 11,
                    }}
                    // tickFormatter={formatCurrency}
                  />
                  <Tooltip
                    // content={<CustomTooltip />}
                    cursor={{
                      stroke: "#343a44",
                      strokeWidth: 1,
                    }}
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
                    stroke="#6f7783"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      r: 5,
                      strokeWidth: 2,
                      stroke: "#101318",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsCompleteChart;
