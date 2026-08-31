import React from "react";
import { FiSearch, FiChevronDown, FiEye } from "react-icons/fi";
import { RiArrowRightWideLine } from "react-icons/ri";
import { RiArrowLeftWideLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { tableFeatures, useTable } from "@tanstack/react-table";
const StoreCustomers = () => {
  const customers = [
    {
      id: 1,
      name: "Arjun Nair",
      email: "arjun.nair@gmail.com",
      orders: 12,
      spent: 28499,
      status: "Active",
      joined: "12 Aug 2026",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul.kumar@gmail.com",
      orders: 8,
      spent: 17499,
      status: "Active",
      joined: "08 Aug 2026",
    },
    {
      id: 3,
      name: "Vishnu Raj",
      email: "vishnu.raj@gmail.com",
      orders: 5,
      spent: 9299,
      status: "Active",
      joined: "01 Aug 2026",
    },
    {
      id: 4,
      name: "Adithya S",
      email: "adithya.s@gmail.com",
      orders: 15,
      spent: 36299,
      status: "Active",
      joined: "28 Jul 2026",
    },
    {
      id: 5,
      name: "Akshay Menon",
      email: "akshay.menon@gmail.com",
      orders: 3,
      spent: 5199,
      status: "Inactive",
      joined: "20 Jul 2026",
    },
    {
      id: 6,
      name: "Nikhil Das",
      email: "nikhil.das@gmail.com",
      orders: 10,
      spent: 21999,
      status: "Active",
      joined: "15 Jul 2026",
    },
    {
      id: 7,
      name: "Akhil Paul",
      email: "akhil.paul@gmail.com",
      orders: 2,
      spent: 3299,
      status: "Inactive",
      joined: "11 Jul 2026",
    },
    {
      id: 8,
      name: "Manu Joseph",
      email: "manu.joseph@gmail.com",
      orders: 18,
      spent: 41799,
      status: "Active",
      joined: "05 Jul 2026",
    },
  ];
  const columns = [
    { accessorKey: "name", header: "Customer" },
    { accessorKey: "orders", header: "Orders" },
    { accessorKey: "spent", header: "Total Spend" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "joined", header: "Joined" },
    { id: "actions", header: "" },
  ];
  const table = useTable({
    data: customers,
    columns,
    features: tableFeatures(),
  });
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active",
  ).length;
  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive",
  ).length;
  const totalSpent = customers.reduce(
    (total, customer) => total + customer.spent,
    0,
  );
  return (
    <div className="min-h-full bg-[#0c0f11] w-full">
      <div className="px-7 py-7">
        <div className="flex items-end justify-between">
          <div>
            <h4 className="text-3xl font-semibold text-white">Customers</h4>
            <p className="mt-1 max-w-2xl text-sm leading-7 text-neutral-400">
              Manage, track and review all your customers
            </p>
          </div>
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-black transition hover:bg-[#e8e8e8]"
          >
            Export
          </button>
        </div>
        <div className="mt-7 grid grid-cols-1 gap-4 text-white sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Total Customers</p>
            <h2 className="mt-2 text-2xl font-semibold"> {totalCustomers} </h2>
            <p className="mt-1 text-xs text-gray-600">
              All registered customers
            </p>
          </div>
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Active Customers</p>
            <h2 className="mt-2 text-2xl font-semibold"> {activeCustomers} </h2>
            <p className="mt-1 text-xs text-gray-600">Currently active</p>
          </div>
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Inactive Customers</p>
            <h2 className="mt-2 text-2xl font-semibold">{inactiveCustomers}</h2>
            <p className="mt-1 text-xs text-gray-600">Currently inactive</p>
          </div>
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Customer Spend</p>
            <h2 className="mt-2 text-2xl font-semibold">
              ₹{totalSpent.toLocaleString("en-IN")}
            </h2>
            <p className="mt-1 text-xs text-gray-600">
              Total customer spending
            </p>
          </div>
        </div>
        <div className="mt-5 w-full overflow-hidden rounded-2xl border border-[#23272d] bg-[#111417] shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between gap-4 border-b border-[#23272d] px-5 py-4">
            <div className="relative w-full max-w-[340px]">
              <FiSearch
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search customers..."
                className="h-10 w-full rounded-xl border border-[#2a3037] bg-[#0c0f11] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#4b535d] focus:bg-[#0e1114]"
              />
            </div>
            <div className="">
             
              <div className="relative w-[150px]">
                <select className="h-10 w-full appearance-none rounded-lg border border-[#292f36] bg-[#0b0e10] px-3 pr-9 text-sm text-gray-400 outline-none focus:border-gray-500">
                  <option value="All">All Customers</option>
                  <option value="High">Active</option>
                  <option value="Low">Inactive</option>
                </select>
                <FiChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={15}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto  w-full">
            <table className="w-full min-w-[850px]">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-b border-[#23272d]"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-gray-600 ${header.column.id === "actions" ? "text-right" : ""}`}
                      >
                        {header.column.columnDef.header}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="w-full ">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-[#23272d] transition duration-200 hover:bg-white/[0.02] last:border-b-0"
                  >
                    {row.getAllCells().map((cell) => {
                      const value = cell.getValue();
                      return (
                        <td
                          key={cell.id}
                          className="whitespace-nowrap px-5 py-4"
                        >
                          {cell.column.id === "name" && (
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-sm font-medium text-gray-300">
                                {row.original.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-200">
                                  {value}
                                </p>
                                <p className="mt-0.5 text-xs text-gray-600">
                                  {row.original.email}
                                </p>
                              </div>
                            </div>
                          )}
                          {cell.column.id === "orders" && (
                            <div>
                              <span className="text-sm text-gray-300">
                                {value}
                              </span>
                              <span className="ml-1 text-xs text-gray-600">
                                orders
                              </span>
                            </div>
                          )}
                          {cell.column.id === "spent" && (
                            <p className="text-sm font-medium text-white">
                              ₹{Number(value).toLocaleString("en-IN")}
                            </p>
                          )}
                          {cell.column.id === "status" && (
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium ${value === "Active" ? "border-green-400/15 bg-green-400/[0.06] text-green-400" : "border-red-400/15 bg-red-400/[0.06] text-red-400"}`}
                            >
                              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />{" "}
                              {value}
                            </span>
                          )}
                          {cell.column.id === "joined" && (
                            <span className="text-sm text-gray-500">
                              {value}
                            </span>
                          )}
                          {cell.column.id === "actions" && (
                            <div className="flex items-center justify-end gap-1">
                              <button
                                type="button"
                                title="View customer"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-all duration-200 hover:bg-white/[0.05] hover:text-white"
                              >
                                <FiEye size={15} />
                              </button>
                              <button
                                type="button"
                                title="More actions"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-all duration-200 hover:bg-white/[0.05] hover:text-white"
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
            <div className="flex w-full items-center justify-end gap-4 border-t border-[#23272d] px-5 py-3">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-gray-500 transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <RiArrowLeftWideLine size={18} />
              </button>

              <button
                type="button"
                className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-white px-2.5 text-xs font-semibold text-black"
              >
                1
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-gray-500 transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
              >
                <RiArrowRightWideLine size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StoreCustomers;
