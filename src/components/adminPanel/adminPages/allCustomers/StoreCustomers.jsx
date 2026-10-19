import React from "react";
import { FiSearch, FiChevronDown, FiEye } from "react-icons/fi";
import { RiArrowRightWideLine } from "react-icons/ri";
import { RiArrowLeftWideLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { tableFeatures, useTable } from "@tanstack/react-table";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const StoreCustomers = () => {
  const [getAuthUsers, setGetAuthUsers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const getAllCustomers = async () => {
    try {
      const adminToken = localStorage.getItem("token");
      const allCustomersApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getAuthenticatedUsers`,
        { headers: { Authorization: `Bearer ${adminToken}` } },
      );
      setGetAuthUsers(allCustomersApi.data.getAuthData);

      console.log("get all customers:", allCustomersApi.data.getAuthData);
      console.log("get all customers:", allCustomersApi.data);
    } catch (error) {
      console.log("error in get all customers", error);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);
  const customers = getAuthUsers.map((customersData) => ({
    id: customersData._id,
    name: customersData.FullName,
    email: customersData.Email,
    orders: customersData.totalOrders,
    spent: customersData.totalSpent,
    status: "Active",
    joined: "12 Aug 2026",
  }));

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

  const [openUserOrdersModal, setOpenUserOrdersModal] = useState(false);
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
                                title="View customer orders"
                                onClick={() => {
                                  const customer = getAuthUsers.find(
                                    (user) => user._id === row.original.id,
                                  );

                                  setSelectedCustomer(customer || null);
                                  setOpenUserOrdersModal(Boolean(customer));
                                }}
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

        {openUserOrdersModal && selectedCustomer && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
            onClick={() => {
              setOpenUserOrdersModal(false);
              setSelectedCustomer(null);
            }}
          >
            <div
              className="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#2B3039] bg-[#101216] shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex min-w-0 flex-col gap-3 px-7 py-4 border-b border-[#2B3039] ">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-300">
                  Customer profile
                </p>

                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-xl font-bold text-purple-300 sm:h-14 sm:w-14">
                    {(selectedCustomer.FullName || "C")
                      .trim()
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-white sm:text-2xl">
                      {selectedCustomer.FullName || "Unknown Customer"}
                    </h2>

                    <p className="mt-1 break-all text-xs text-gray-400 sm:text-sm">
                      {selectedCustomer.Email || "No email available"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 sm:p-7">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-white sm:text-lg">
                      Order history
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Review purchases, payments and delivery information.
                    </p>
                  </div>

                  <span className="rounded-lg border border-[#2B3039] bg-[#191C22] px-3 py-1.5 text-xs text-gray-300">
                    {selectedCustomer.orders?.length ?? 0}{" "}
                    {(selectedCustomer.orders?.length ?? 0) === 1
                      ? "order"
                      : "orders"}
                  </span>
                </div>

                {selectedCustomer.orders?.length > 0 ? (
                  <div className="space-y-5">
                    {[...selectedCustomer.orders]
                      .sort(
                        (a, b) =>
                          new Date(b.orderDate || b.createdAt || 0).getTime() -
                          new Date(a.orderDate || a.createdAt || 0).getTime(),
                      )
                      .map((orderDetails) => {
                        const status = orderDetails.orderStatus || "Pending";

                        const statusStyle =
                          status === "Delivered"
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                            : status === "Cancelled"
                              ? "border-red-400/20 bg-red-400/10 text-red-300"
                              : status === "Shipped" ||
                                  status === "Out for Delivery"
                                ? "border-blue-400/20 bg-blue-400/10 text-blue-300"
                                : status === "Processing"
                                  ? "border-orange-400/20 bg-orange-400/10 text-orange-300"
                                  : status === "Confirmed"
                                    ? "border-green-400/20 bg-green-400/10 text-green-300"
                                    : "border-amber-400/20 bg-amber-400/10 text-amber-300";

                        const address = orderDetails.deliveryAddress;

                        return (
                          <article
                            key={orderDetails._id}
                            className="overflow-hidden rounded-2xl border border-[#292D36] bg-[#14171D] transition-colors hover:border-[#3A3F4B]"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#292D36] px-4 py-4 sm:px-5">
                              <div className="min-w-0">
                                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">
                                  Order reference
                                </p>
                                <p className="mt-1 break-all font-mono text-xs text-gray-300 sm:text-sm">
                                  #{orderDetails._id || "N/A"}
                                </p>
                              </div>

                              <span
                                className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${statusStyle}`}
                              >
                                {status}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_220px]">
                              <div className="flex min-w-0 flex-col gap-4 sm:flex-row">
                                {orderDetails.product?.image ? (
                                  <img
                                    src={orderDetails.product.image}
                                    alt={
                                      orderDetails.product?.name || "Product"
                                    }
                                    className="h-36 w-full rounded-xl border border-[#2B3039] bg-[#0B0D10] object-cover sm:h-36 sm:w-28"
                                  />
                                ) : (
                                  <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl border border-[#2B3039] bg-[#0B0D10] text-xs text-gray-600 sm:h-36 sm:w-28">
                                    No image
                                  </div>
                                )}

                                <div className="min-w-0 flex-1">
                                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">
                                    Product
                                  </p>
                                  <h4 className="mt-1 break-words text-base font-semibold text-white">
                                    {orderDetails.product?.name ||
                                      "Product unavailable"}
                                  </h4>

                                  <p className="mt-2 text-sm font-medium text-gray-300">
                                    ₹
                                    {(
                                      orderDetails.product?.price ?? 0
                                    ).toLocaleString("en-IN")}
                                    <span className="ml-1 text-xs font-normal text-gray-500">
                                      per item
                                    </span>
                                  </p>

                                  <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-lg border border-[#30343D] bg-[#1B1F27] px-2.5 py-1.5 text-xs text-gray-300">
                                      Size:{" "}
                                      {orderDetails.product?.size || "N/A"}
                                    </span>

                                    <span className="flex items-center gap-2 rounded-lg border border-[#30343D] bg-[#1B1F27] px-2.5 py-1.5 text-xs text-gray-300">
                                      {orderDetails.product?.color?.code && (
                                        <span
                                          className="h-3 w-3 rounded-full border border-white/20"
                                          style={{
                                            backgroundColor:
                                              orderDetails.product.color.code,
                                          }}
                                        />
                                      )}
                                      Color:{" "}
                                      {orderDetails.product?.color?.name ||
                                        "N/A"}
                                    </span>

                                    <span className="rounded-lg border border-[#30343D] bg-[#1B1F27] px-2.5 py-1.5 text-xs text-gray-300">
                                      Qty: {orderDetails.product?.quantity ?? 0}
                                    </span>
                                  </div>

                                  <p className="mt-4 text-xs text-gray-500">
                                    Ordered{" "}
                                    {orderDetails.orderDate ||
                                    orderDetails.createdAt
                                      ? new Date(
                                          orderDetails.orderDate ||
                                            orderDetails.createdAt,
                                        ).toLocaleString("en-IN", {
                                          dateStyle: "medium",
                                          timeStyle: "short",
                                        })
                                      : "Date unavailable"}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-row items-center justify-between gap-3 border-t border-[#292D36] pt-4 sm:items-start lg:flex-col lg:justify-start lg:border-l lg:border-t-0 lg:pl-5 lg:pt-1">
                                <div>
                                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">
                                    Order total
                                  </p>
                                  <p className="mt-1 text-2xl font-semibold text-white">
                                    ₹
                                    {(
                                      orderDetails.totalAmount ?? 0
                                    ).toLocaleString("en-IN")}
                                  </p>
                                </div>

                                <div className="space-y-2 lg:mt-4">
                                  <div>
                                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                                      Payment method
                                    </p>
                                    <p className="mt-1 text-xs font-medium text-gray-200">
                                      {orderDetails.paymentMethod || "N/A"}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                                      Payment status
                                    </p>
                                    <span
                                      className={`mt-1 inline-flex rounded-md px-2 py-1 text-xs ${
                                        orderDetails.paymentStatus?.toLowerCase() ===
                                        "paid"
                                          ? "bg-emerald-400/10 text-emerald-300"
                                          : orderDetails.paymentStatus?.toLowerCase() ===
                                              "failed"
                                            ? "bg-red-400/10 text-red-300"
                                            : "bg-amber-400/10 text-amber-300"
                                      }`}
                                    >
                                      {orderDetails.paymentStatus || "Pending"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-[#292D36] bg-[#101318] p-4 sm:p-5">
                              <div className="mb-4 flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-400/10 text-blue-300">
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="h-4 w-4"
                                  >
                                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                                    <circle cx="12" cy="10" r="2.5" />
                                  </svg>
                                </span>
                                <div>
                                  <h5 className="text-sm font-semibold text-white">
                                    Delivery details
                                  </h5>
                                  <p className="text-[11px] text-gray-500">
                                    Shipping address for this order
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                                    Recipient
                                  </p>
                                  <p className="mt-1 break-words text-sm text-gray-200">
                                    {address?.name || "N/A"}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                                    Phone
                                  </p>
                                  <p className="mt-1 break-words text-sm text-gray-200">
                                    {address?.phone || "N/A"}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                                    Email
                                  </p>
                                  <p className="mt-1 break-all text-sm text-gray-200">
                                    {address?.email ||
                                      selectedCustomer.Email ||
                                      "N/A"}
                                  </p>
                                </div>

                                <div className="sm:col-span-2">
                                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                                    Address
                                  </p>
                                  <p className="mt-1 break-words text-sm leading-6 text-gray-200">
                                    {address?.address || "N/A"}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                                    City / District
                                  </p>
                                  <p className="mt-1 break-words text-sm text-gray-200">
                                    {[address?.city, address?.district]
                                      .filter(Boolean)
                                      .join(", ") || "N/A"}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                                    State
                                  </p>
                                  <p className="mt-1 break-words text-sm text-gray-200">
                                    {address?.state || "N/A"}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                                    Pincode
                                  </p>
                                  <p className="mt-1 text-sm text-gray-200">
                                    {address?.pincode || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                  </div>
                ) : (
                  <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#30343D] bg-[#14171D]/60 px-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#30343D] bg-[#1B1F27] text-gray-400">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-7 w-7"
                      >
                        <path d="M3 7h18l-2 13H5L3 7Z" />
                        <path d="M8 9V6a4 4 0 0 1 8 0v3" />
                      </svg>
                    </div>
                    <h4 className="mt-4 text-sm font-semibold text-white">
                      No orders yet
                    </h4>
                    <p className="mt-2 max-w-xs text-xs leading-5 text-gray-500">
                      This customer has not placed any orders. Their purchases
                      will appear here when available.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-[#272B33] bg-[#101216] px-4 py-4 sm:px-7">
                <p className="hidden text-xs text-gray-500 sm:block">
                  ME Store · Customer management
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setOpenUserOrdersModal(false);
                    setSelectedCustomer(null);
                  }}
                  className="ml-auto rounded-xl border border-[#353A45] bg-[#1A1D24] px-5 py-2.5 text-sm font-medium text-gray-200 transition hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white"
                >
                  Close details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default StoreCustomers;
