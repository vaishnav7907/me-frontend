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

  const currentYear= new Date().getFullYear()
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

  const analyticsData= getAnalysis?.analytics ?? []
  const summary = getAnalysis?.summary
  

  return (
    <div className="w-full bg-[#101318] border border-[#242932] rounded-2xl overflow-hidden">
      <div className="px-6  pt-6 flex justify-between items-center ">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#626a76] mb-2">
            Store Analytics
          </p>
          <h2 className="text-xl font-semibold text-white">Revenue & Profit</h2>
          <p className="text-sm text-[#6f7783] mt-1">
            Monthly performance for {selectedYear}
          </p>
        </div>

        <div className="relative">
          <select
            name=""
            id=""
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="appearance-none
            bg-[#181c22]
                border border-[#292e36]
                text-white
                text-sm rounded-lg  pl-4
                pr-10
                py-2.5 outline-none cursor-pointer
                hover:border-[#3a4049]
                transition"
          >
            {analyticsData.map((item) => (
              <option value={item.year} key={item.year}>
                {item.year}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737b87] pointer-events-none">
            ↓
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 px-6">
        <div className="bg-[#15191f] border border-[#242932] rounded-xl p-4">
          <p className="text-[10px] uppercase tracking-[0.15em] text-[#626a76]">
            Total Revenue
          </p>

          <h3 className="text-xl font-semibold text-white mt-2">$238</h3>

          <p className="text-[11px] text-[#626a76] mt-1">{selectedYear}</p>
        </div>

        <div className="bg-[#15191f] border border-[#242932] rounded-xl p-4">
          <p className="text-[10px] uppercase tracking-[0.15em] text-[#626a76]">
            Total profit
          </p>

          <h3 className="text-xl font-semibold text-white mt-2">$238</h3>

          <p className="text-[11px] text-[#626a76] mt-1">{selectedYear}</p>
        </div>
      </div>

      {/* chart///// */}

      <div className="w-full h-[380px]  px-3 sm:px-6 mt-6 pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
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
  );
};

export default AnalyticsChart;
