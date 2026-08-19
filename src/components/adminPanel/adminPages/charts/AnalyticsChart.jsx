import React, { useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
const AnalyticsChart = () => {
  const [selectedYear, setSelectedYear] = useState("2026");
  const analyticsData = [
    {
      year: 2025,
      months: [
        { month: "Jan", revenue: 85000, profit: 18000 },
        { month: "Feb", revenue: 95000, profit: 22000 },
        { month: "Mar", revenue: 110000, profit: 27000 },
        { month: "Apr", revenue: 100000, profit: 24000 },
        { month: "May", revenue: 120000, profit: 30000 },
        { month: "Jun", revenue: 130000, profit: 35000 },
        { month: "Jul", revenue: 125000, profit: 32000 },
        { month: "Aug", revenue: 140000, profit: 40000 },
        { month: "Sep", revenue: 155000, profit: 45000 },
        { month: "Oct", revenue: 170000, profit: 52000 },
        { month: "Nov", revenue: 200000, profit: 65000 },
        { month: "Dec", revenue: 250000, profit: 85000 },
      ],
    },

    {
      year: 2026,
      months: [
        { month: "Jan", revenue: 120000, profit: 28000 },
        { month: "Feb", revenue: 135000, profit: 32000 },
        { month: "Mar", revenue: 150000, profit: 40000 },
        { month: "Apr", revenue: 142000, profit: 35000 },
        { month: "May", revenue: 165000, profit: 45000 },
        { month: "Jun", revenue: 180000, profit: 52000 },
        { month: "Jul", revenue: 195000, profit: 58000 },
        { month: "Aug", revenue: 210000, profit: 65000 },
        { month: "Sep", revenue: 225000, profit: 72000 },
        { month: "Oct", revenue: 240000, profit: 80000 },
        { month: "Nov", revenue: 280000, profit: 95000 },
        { month: "Dec", revenue: 340000, profit: 120000 },
      ],
    },
  ];
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
