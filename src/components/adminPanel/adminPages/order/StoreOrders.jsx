import { tableFeatures, useTable } from "@tanstack/react-table";
import React from "react";
import { BsBox } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
const StoreOrders = () => {
  const orders = [
    {
      id: "#ME-1048",
      customer: "Arjun Nair",
      email: "arjun.nair@gmail.com",
      items: 3,
      amount: 7499,
      payment: "Paid",
      status: "Delivered",
      date: "30 Aug 2026",
    },
    {
      id: "#ME-1047",
      customer: "Rahul Kumar",
      email: "rahul.kumar@gmail.com",
      items: 2,
      amount: 4299,
      payment: "Paid",
      status: "Shipped",
      date: "30 Aug 2026",
    },
    {
      id: "#ME-1046",
      customer: "Vishnu Raj",
      email: "vishnu.raj@gmail.com",
      items: 1,
      amount: 1899,
      payment: "Pending",
      status: "Processing",
      date: "29 Aug 2026",
    },
    {
      id: "#ME-1045",
      customer: "Adithya S",
      email: "adithya.s@gmail.com",
      items: 4,
      amount: 9499,
      payment: "Paid",
      status: "Delivered",
      date: "29 Aug 2026",
    },
    {
      id: "#ME-1044",
      customer: "Akshay Menon",
      email: "akshay.menon@gmail.com",
      items: 2,
      amount: 3599,
      payment: "Failed",
      status: "Cancelled",
      date: "28 Aug 2026",
    },
    {
      id: "#ME-1043",
      customer: "Nikhil Das",
      email: "nikhil.das@gmail.com",
      items: 3,
      amount: 6199,
      payment: "Paid",
      status: "Shipped",
      date: "28 Aug 2026",
    },
    {
      id: "#ME-1042",
      customer: "Akhil Paul",
      email: "akhil.paul@gmail.com",
      items: 1,
      amount: 1599,
      payment: "Pending",
      status: "Processing",
      date: "27 Aug 2026",
    },
    {
      id: "#ME-1041",
      customer: "Manu Joseph",
      email: "manu.joseph@gmail.com",
      items: 5,
      amount: 11499,
      payment: "Paid",
      status: "Delivered",
      date: "27 Aug 2026",
    },
  ];

  const columns = [
    { accessorKey: "id", header: "order" },
    { accessorKey: "customer", header: "customer" },
    { accessorKey: "items", header: "items" },
    { accessorKey: "amount", header: "amount" },
    { accessorKey: "payment", header: "payment" },
    { accessorKey: "status", header: "status" },
    { accessorKey: "date", header: "date" },
    { accessorKey: "actions" },
  ];

  const table = useTable({
    data: orders,
    columns,
    features: tableFeatures(),
  });

  return (
    <div>
      <div className="px-7 py-7">
        <div>
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span>
                <h4 className="font-semibold text-3xl  text-white  ">Orders</h4>
                <p className="max-w-2xl   text-neutral-400 leading-8">
                  Manage , track and review all customer orders
                </p>
              </span>
            </div>

            <button
              className="flex items-center gap-2 h-9 px-2.5 bg-white font-semibold text-sm rounded-lg  transition
                                  hover:bg-[#e8e8e8]"
            >
              <p>Export</p>
            </button>
          </div>
        </div>
        {/* overview */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-white">
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="mt-2 text-2xl font-semibold">24</h2>
          </div>

          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Processing</p>
            <h2 className="mt-2 text-2xl font-semibold">18</h2>
          </div>
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Shipped</p>
            <h2 className="mt-2 text-2xl font-semibold">2</h2>
          </div>

          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <span className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Paid revenue</p>
              <BsBox size={18} />
            </span>

            <h2 className="mt-2 text-2xl font-semibold">128</h2>
          </div>
        </div>

        <div className="w-full overflow-hidden rounded-2xl border border-[#23272d] bg-[#111417] shadow-[0_10px_40px_rgba(0,0,0,0.18)]  mt-5">
          {/* ================= TOOLBAR ================= */}
          <div className="flex items-center justify-between gap-4 border-b border-[#23272d] px-5 py-4">
            {/* Search */}
            <div className="relative w-full max-w-[340px]">
              <FiSearch
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search brands..."
                className=" h-10 w-full rounded-xl border border-[#2a3037] bg-[#0c0f11] pl-10 pr-4 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-[#4b535d] focus:bg-[#0e1114] "
              />
            </div>
            {/* View Toggle */}

            <div className="flex items-center gap-5">
              <div className="relative w-[160px]">
                <select className="h-10 w-full appearance-none rounded-lg border border-[#292f36] bg-[#0b0e10]  px-3  pr-9 text-sm text-gray-400 outline-none focus:border-gray-500 ">
                  <option value="All">All Status</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <FiChevronDown
                  className=" pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={15}
                />
              </div>
              <div className="relative w-[160px]">
                <select className="h-10 w-full appearance-none rounded-lg border border-[#292f36] bg-[#0b0e10]  px-3  pr-9 text-sm text-gray-400 outline-none focus:border-gray-500 ">
                  <option value="All">All Payments</option>
                  <option value="Processing">Paid</option>
                  <option value="Shipped">Pending</option>
                  <option value="Delivered">Failed</option>
                </select>

                <FiChevronDown
                  className=" pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={15}
                />
              </div>
            </div>
          </div>
          <div className="">
            <table className="w-full">
              <thead className="">
                {table.getHeaderGroups().map((tableRow) => (
                  <tr key={tableRow.id} className="border-b border-[#23272d]">
                    {tableRow.headers.map((tablehead) => (
                      <th className=" px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-gray-600">
                        {tablehead.column.columnDef.header}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((tablebody) => (
                  <tr
                    key={tablebody.id}
                    className=" border-b border-[#23272d] transition duration-200 hover:bg-white/[0.02] last:border-b-0 "
                  >
                    {tablebody.getAllCells().map((tableCell) => {
                      const value = tableCell.getValue();

                      return (
                        <td
                          key={tableCell.id}
                          className="px-5 py-4 whitespace-nowrap"
                        >
                          {/* ORDER ID */}
                          {tableCell.column.id === "id" && (
                            <div>
                              <p className="text-sm font-medium text-white">
                                {value}
                              </p>
                            </div>
                          )}

                          {/* CUSTOMER */}
                          {tableCell.column.id === "customer" && (
                            <div>
                              <p className="text-sm font-medium text-gray-200">
                                {value}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-600">
                                {tablebody.original.email}
                              </p>
                            </div>
                          )}

                          {/* ITEMS */}
                          {tableCell.column.id === "items" && (
                            <div>
                              <span className="text-sm text-gray-400">
                                {value}
                              </span>

                              <span className="ml-1 text-xs text-gray-600">
                                items
                              </span>
                            </div>
                          )}

                          {/* AMOUNT */}
                          {tableCell.column.id === "amount" && (
                            <div>
                              <p className="text-sm font-medium text-white">
                                ₹{Number(value).toLocaleString("en-IN")}
                              </p>
                            </div>
                          )}

                          {/* PAYMENT */}
                          {tableCell.column.id === "payment" && (
                            <div>
                              <span
                                className={`inline-flex items-center text-xs font-mediu ${value === "Paid" ? "text-green-400" : value === "Pending" ? "text-yellow-400" : "text-red-400"} `}
                              >
                                <span
                                  className={` mr-2 h-1.5 w-1.5 rounded-full ${value === "Paid" ? "bg-green-400" : value === "Pending" ? "bg-yellow-400" : "bg-red-400"}`}
                                />

                                {value}
                              </span>
                            </div>
                          )}

                          {/* STATUS */}
                          {tableCell.column.id === "status" && (
                            <div>
                              <span
                                className={`  inline-flex  items-center  rounded-full  border px-2.5  py-1 text-[10px]  font-medium
                    ${
                      value === "Delivered"
                        ? "border-green-400/15 bg-green-400/[0.06] text-green-400"
                        : value === "Shipped"
                          ? "border-blue-400/15 bg-blue-400/[0.06] text-blue-400"
                          : value === "Processing"
                            ? "border-yellow-400/15 bg-yellow-400/[0.06] text-yellow-400"
                            : value === "Cancelled"
                              ? "border-red-400/15 bg-red-400/[0.06] text-red-400"
                              : "border-gray-400/15 bg-gray-400/[0.06] text-gray-400"
                    }
                  `}
                              >
                                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                                {value}
                              </span>
                            </div>
                          )}

                          {/* DATE */}
                          {tableCell.column.id === "date" && (
                            <div>
                              <p className="text-xs text-gray-500">{value}</p>
                            </div>
                          )}

                          {tableCell.column.id === "actions" && (
                            <div className="flex items-center justify-end gap-1">
                              {/* View order */}
                              <button
                                type="button"
                                title="View order"
                                className="  flex  h-8  w-8  items-center  justify-center  rounded-lg  text-gray-500  transition-all  duration-200  hover:bg-white/[0.05]  hover:text-white"
                              >
                                <FiEye size={15} />
                              </button>

                              {/* More actions */}
                              <button
                                type="button"
                                title="More actions"
                                className=" flex h-8 w-8 items-center justify-center rounded-lg text-gray-500  transition-all  duration-200 hover:bg-white/[0.05] hover:text-white"
                              >
                                <BsThreeDots size={18} />
                              </button>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOrders;
