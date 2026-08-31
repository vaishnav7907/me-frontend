import React from "react";
import {
  FiArrowUpRight,
  FiArrowDownRight,
  FiDownload,
  FiChevronDown,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const StoreSales = () => {
  const salesData = [
    { month: "Jan", revenue: 42000, profit: 17000 },
    { month: "Feb", revenue: 51000, profit: 22000 },
    { month: "Mar", revenue: 47000, profit: 19000 },
    { month: "Apr", revenue: 63000, profit: 28000 },
    { month: "May", revenue: 72000, profit: 33000 },
    { month: "Jun", revenue: 68000, profit: 30000 },
    { month: "Jul", revenue: 85000, profit: 41000 },
    { month: "Aug", revenue: 94000, profit: 47000 },
  ];
  const topProducts = [
    {
      id: 1,
      name: "Classic White Shirt",
      category: "Shirts",
      sold: 128,
      revenue: 319872,
    },
    {
      id: 2,
      name: "Slim Fit Black Shirt",
      category: "Shirts",
      sold: 104,
      revenue: 259896,
    },
    {
      id: 3,
      name: "Oversized T-Shirt",
      category: "T-Shirts",
      sold: 96,
      revenue: 191904,
    },
    {
      id: 4,
      name: "Tailored Blazer",
      category: "Blazers",
      sold: 72,
      revenue: 287928,
    },
    {
      id: 5,
      name: "Slim Fit Jeans",
      category: "Pants",
      sold: 65,
      revenue: 162435,
    },
  ];
  const recentSales = [
    {
      id: "#ORD-1048",
      customer: "Arjun Nair",
      product: "Classic White Shirt",
      amount: 2499,
      status: "Completed",
      date: "31 Aug 2026",
    },
    {
      id: "#ORD-1047",
      customer: "Rahul Kumar",
      product: "Tailored Blazer",
      amount: 3999,
      status: "Completed",
      date: "31 Aug 2026",
    },
    {
      id: "#ORD-1046",
      customer: "Vishnu Raj",
      product: "Slim Fit Jeans",
      amount: 2499,
      status: "Processing",
      date: "30 Aug 2026",
    },
    {
      id: "#ORD-1045",
      customer: "Adithya S",
      product: "Oversized T-Shirt",
      amount: 1999,
      status: "Completed",
      date: "30 Aug 2026",
    },
    {
      id: "#ORD-1044",
      customer: "Manu Joseph",
      product: "Leather Jacket",
      amount: 5999,
      status: "Refunded",
      date: "29 Aug 2026",
    },
  ];
  return (
    <div className="min-h-full w-full bg-[#0c0f11]">
      {" "}
      <div className="px-7 py-7">
        {" "}
        <div className="flex items-end justify-between">
          {" "}
          <div>
            {" "}
            <h4 className="text-3xl font-semibold text-white">Sales</h4>{" "}
            <p className="mt-1 max-w-2xl text-sm leading-7 text-neutral-400">
              {" "}
              Track your sales performance, revenue and profit{" "}
            </p>{" "}
          </div>{" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="relative w-[140px]">
              {" "}
              <select className="h-9 w-full appearance-none rounded-lg border border-[#292f36] bg-[#111417] px-3 pr-8 text-sm text-gray-400 outline-none focus:border-gray-500">
                {" "}
                <option>Last 30 Days</option> <option>Last 3 Months</option>{" "}
                <option>Last 6 Months</option> <option>This Year</option>{" "}
              </select>{" "}
              <FiChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />{" "}
            </div>{" "}
            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-black transition hover:bg-[#e8e8e8]"
            >
              {" "}
              <FiDownload size={14} /> Export{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {" "}
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            {" "}
            <p className="text-sm text-gray-500">Total Revenue</p>{" "}
            <div className="mt-2 flex items-end justify-between">
              {" "}
              <h2 className="text-2xl font-semibold text-white">
                {" "}
                ₹5,22,000{" "}
              </h2>{" "}
              <span className="flex items-center gap-1 text-xs text-gray-400">
                {" "}
                <FiArrowUpRight size={13} /> 18.4%{" "}
              </span>{" "}
            </div>{" "}
            <p className="mt-2 text-xs text-gray-600">
              {" "}
              Compared with previous period{" "}
            </p>{" "}
          </div>{" "}
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            {" "}
            <p className="text-sm text-gray-500">Total Profit</p>{" "}
            <div className="mt-2 flex items-end justify-between">
              {" "}
              <h2 className="text-2xl font-semibold text-white">
                {" "}
                ₹2,47,000{" "}
              </h2>{" "}
              <span className="flex items-center gap-1 text-xs text-gray-400">
                {" "}
                <FiArrowUpRight size={13} /> 12.8%{" "}
              </span>{" "}
            </div>{" "}
            <p className="mt-2 text-xs text-gray-600">
              {" "}
              Net profit from sales{" "}
            </p>{" "}
          </div>{" "}
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            {" "}
            <p className="text-sm text-gray-500">Total Orders</p>{" "}
            <div className="mt-2 flex items-end justify-between">
              {" "}
              <h2 className="text-2xl font-semibold text-white">428</h2>{" "}
              <span className="flex items-center gap-1 text-xs text-gray-400">
                {" "}
                <FiArrowUpRight size={13} /> 9.6%{" "}
              </span>{" "}
            </div>{" "}
            <p className="mt-2 text-xs text-gray-600">
              {" "}
              Successfully placed orders{" "}
            </p>{" "}
          </div>{" "}
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            {" "}
            <p className="text-sm text-gray-500">Average Order Value</p>{" "}
            <div className="mt-2 flex items-end justify-between">
              {" "}
              <h2 className="text-2xl font-semibold text-white">
                {" "}
                ₹1,220{" "}
              </h2>{" "}
              <span className="flex items-center gap-1 text-xs text-gray-500">
                {" "}
                <FiArrowDownRight size={13} /> 2.4%{" "}
              </span>{" "}
            </div>{" "}
            <p className="mt-2 text-xs text-gray-600">
              {" "}
              Average revenue per order{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {" "}
          <div className="rounded-2xl border border-[#23272d] bg-[#111417] p-5 lg:col-span-2">
            {" "}
            <div className="flex items-center justify-between">
              {" "}
              <div>
                {" "}
                <h3 className="text-base font-medium text-white">
                  {" "}
                  Sales Overview{" "}
                </h3>{" "}
                <p className="mt-1 text-xs text-gray-600">
                  {" "}
                  Revenue and profit performance{" "}
                </p>{" "}
              </div>{" "}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                {" "}
                <span className="flex items-center gap-1.5">
                  {" "}
                  <span className="h-2 w-2 rounded-full bg-white" />{" "}
                  Revenue{" "}
                </span>{" "}
                <span className="flex items-center gap-1.5">
                  {" "}
                  <span className="h-2 w-2 rounded-full bg-gray-600" />{" "}
                  Profit{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div className="mt-6 h-[310px]">
              {" "}
              <ResponsiveContainer width="100%" height="100%">
                {" "}
                <BarChart data={salesData}>
                  {" "}
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#24272c"
                    vertical={false}
                  />{" "}
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 11 }}
                  />{" "}
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 11 }}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                  />{" "}
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    contentStyle={{
                      background: "#151719",
                      border: "1px solid #2a3037",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                    formatter={(value) => [
                      `₹${Number(value).toLocaleString("en-IN")}`,
                    ]}
                  />{" "}
                  <Bar
                    dataKey="revenue"
                    fill="#ffffff"
                    radius={[4, 4, 0, 0]}
                    barSize={18}
                  />{" "}
                  <Bar
                    dataKey="profit"
                    fill="#555b63"
                    radius={[4, 4, 0, 0]}
                    barSize={18}
                  />{" "}
                </BarChart>{" "}
              </ResponsiveContainer>{" "}
            </div>{" "}
          </div>{" "}
          <div className="rounded-2xl border border-[#23272d] bg-[#111417] p-5">
            {" "}
            <h3 className="text-base font-medium text-white">
              {" "}
              Sales Summary{" "}
            </h3>{" "}
            <p className="mt-1 text-xs text-gray-600">
              {" "}
              Current period performance{" "}
            </p>{" "}
            <div className="mt-7 space-y-6">
              {" "}
              <div>
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <span className="text-xs text-gray-500">Revenue</span>{" "}
                  <span className="text-sm font-medium text-white">
                    {" "}
                    ₹5,22,000{" "}
                  </span>{" "}
                </div>{" "}
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#20242a]">
                  {" "}
                  <div className="h-full w-[84%] rounded-full bg-white" />{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <span className="text-xs text-gray-500">Profit</span>{" "}
                  <span className="text-sm font-medium text-white">
                    {" "}
                    ₹2,47,000{" "}
                  </span>{" "}
                </div>{" "}
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#20242a]">
                  {" "}
                  <div className="h-full w-[61%] rounded-full bg-white" />{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <span className="text-xs text-gray-500">Orders</span>{" "}
                  <span className="text-sm font-medium text-white">
                    {" "}
                    428{" "}
                  </span>{" "}
                </div>{" "}
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#20242a]">
                  {" "}
                  <div className="h-full w-[72%] rounded-full bg-white" />{" "}
                </div>{" "}
              </div>{" "}
              <div className="border-t border-[#23272d] pt-5">
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <span className="text-xs text-gray-500">
                    {" "}
                    Profit Margin{" "}
                  </span>{" "}
                  <span className="text-xl font-semibold text-white">
                    {" "}
                    47.3%{" "}
                  </span>{" "}
                </div>{" "}
                <p className="mt-2 text-xs text-gray-600">
                  {" "}
                  Revenue converted into profit{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {" "}
          <div className="overflow-hidden rounded-2xl border border-[#23272d] bg-[#111417]">
            {" "}
            <div className="flex items-center justify-between border-b border-[#23272d] px-5 py-4">
              {" "}
              <div>
                {" "}
                <h3 className="text-base font-medium text-white">
                  {" "}
                  Top Products{" "}
                </h3>{" "}
                <p className="mt-1 text-xs text-gray-600">
                  {" "}
                  Best performing products{" "}
                </p>{" "}
              </div>{" "}
              <button className="text-xs text-gray-500 transition hover:text-white">
                {" "}
                View all{" "}
              </button>{" "}
            </div>{" "}
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b border-[#23272d] px-5 py-4 last:border-b-0"
              >
                {" "}
                <div className="flex items-center gap-3">
                  {" "}
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-xs text-gray-500">
                    {" "}
                    {index + 1}{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <p className="text-sm font-medium text-gray-300">
                      {" "}
                      {product.name}{" "}
                    </p>{" "}
                    <p className="mt-0.5 text-xs text-gray-600">
                      {" "}
                      {product.category} · {product.sold} sold{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <p className="text-sm font-medium text-white">
                  {" "}
                  ₹{product.revenue.toLocaleString("en-IN")}{" "}
                </p>{" "}
              </div>
            ))}{" "}
          </div>{" "}
          <div className="overflow-hidden rounded-2xl border border-[#23272d] bg-[#111417]">
            {" "}
            <div className="flex items-center justify-between border-b border-[#23272d] px-5 py-4">
              {" "}
              <div>
                {" "}
                <h3 className="text-base font-medium text-white">
                  {" "}
                  Recent Sales{" "}
                </h3>{" "}
                <p className="mt-1 text-xs text-gray-600">
                  {" "}
                  Latest transactions{" "}
                </p>{" "}
              </div>{" "}
              <button className="text-xs text-gray-500 transition hover:text-white">
                {" "}
                View all{" "}
              </button>{" "}
            </div>{" "}
            {recentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between border-b border-[#23272d] px-5 py-4 last:border-b-0"
              >
                {" "}
                <div>
                  {" "}
                  <div className="flex items-center gap-2">
                    {" "}
                    <p className="text-sm font-medium text-gray-300">
                      {" "}
                      {sale.customer}{" "}
                    </p>{" "}
                    <span className="text-[10px] text-gray-600">
                      {" "}
                      {sale.id}{" "}
                    </span>{" "}
                  </div>{" "}
                  <p className="mt-1 text-xs text-gray-600">
                    {" "}
                    {sale.product} · {sale.date}{" "}
                  </p>{" "}
                </div>{" "}
                <div className="text-right">
                  {" "}
                  <p className="text-sm font-medium text-white">
                    {" "}
                    ₹{sale.amount.toLocaleString("en-IN")}{" "}
                  </p>{" "}
                  <span
                    className={`mt-1 inline-flex text-[10px] ${sale.status === "Completed" ? "text-gray-300" : sale.status === "Processing" ? "text-gray-500" : "text-gray-600"}`}
                  >
                    {" "}
                    {sale.status}{" "}
                  </span>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default StoreSales;
