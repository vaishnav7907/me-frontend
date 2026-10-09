import { tableFeatures, useTable } from "@tanstack/react-table";
import React from "react";
import { BsBox } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FiChevronDown, FiEdit } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { MdOutlineLayers } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoClose, IoLayersOutline, IoChevronDown } from "react-icons/io5";
import { FiPackage, FiTruck, FiCheckCircle, FiClock } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const StoreOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("All");
  const getAllOrders = async () => {
    try {
      const getAllOrdersFn = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getAdminOrder`,
      );

      setAllOrders(getAllOrdersFn.data.orders);
      console.log("all orders", getAllOrdersFn.data.orders);
    } catch (error) {
      console.log("error in get all orders", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const filteredOrder = allOrders.filter((statusFilter) => {
    const orderStatusMatch =
      orderStatusFilter === "All" ||
      statusFilter.orderStatus === orderStatusFilter;

    const paymentStatusMatch =
      paymentStatusFilter === "All" ||
      statusFilter.paymentStatus === paymentStatusFilter;

    return orderStatusMatch && paymentStatusMatch;
  });

  const orders = filteredOrder.map((order, index) => ({
    orderId: order._id,
    id: `#ME-${index + 1}`,
    customer: order.user?.FullName,
    email: order.user?.Email,
    items: order.product?.quantity,
    amount: order.product?.price,
    payment: order.paymentStatus,
    status: order.orderStatus,
    date: new Date(order.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));

  const [selectOrders, setSelectOrders] = useState([]);

  // const toggleSelectAll = () => {
  //   if (selectOrders.length === orders.length) {
  //     setSelectOrders([]);
  //   } else {
  //     setSelectOrders(orders.map((order) => order.id));
  //   }
  // };

  const toggleSelectAll = () => {
    if (selectOrders.length === orders.length) {
      setSelectOrders([]);
    } else {
      setSelectOrders(orders.map((order) => order.orderId));
    }
  };

  const columns = [
    {
      accessorKey: "checkbox",
      header: (
        <input
          type="checkbox"
          checked={orders.length > 0 && selectOrders.length === orders.length}
          onChange={toggleSelectAll}
          className="accent-purple-600 w-4 h-4 cursor-pointer"
        />
      ),
    },
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

  const [selectUpdateOrder, setselectUpdateOrder] = useState(null);
  const [updateStatusModal, setUpdateStatusModal] = useState(false);
  const [orderids, setOrderids] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const [loading, setLoading] = useState(false);
  console.log("order id s", orderids);

  const openStatusModal = (order) => {
    setselectUpdateOrder(order);
    setUpdateStatusModal(true);
  };

  const updateOrders = async () => {
    try {
      const adminToken = localStorage.getItem("token");

      setLoading(true);
      const updateOrderstatusfn = await axios.patch(
        `${import.meta.env.VITE_API_URL}/Me/updateOrderStatus/${orderids}`,
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${adminToken}` } },
      );

      console.log("update order status", updateOrderstatusfn.data);

      if (updateOrderstatusfn.data.success) {
        alert("Order Status Updated Successfully");
        setUpdateStatusModal(false);
        setNewStatus("");
        getAllOrders();
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const [bulkOrderIds, setBulkOrderIds] = useState(null);

  const [bulkOrderStatusModal, setBulkOrderStatusModal] = useState(false);
  const [bulkNewStatus, setBulkNewStatus] = useState("");
  const statusOptions = [
    "Confirmed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  console.log("bulknew status", bulkNewStatus);
  console.log("selected ids", selectOrders);
  console.log("bulk order idd", bulkOrderIds);

  const bulkUpdateOrderStatus = async () => {
    if (!selectOrders.length || !bulkNewStatus) {
      alert("Select orders and a new status");
      return;
    }

    try {
      setLoading(true);

      const adminToken = localStorage.getItem("token");

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/Me/bulkUpdateOrderStatus`,
        {
          orderIds: selectOrders,
          orderStatus: bulkNewStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      if (response.data.success) {
        alert("Selected orders updated successfully");
        setBulkOrderStatusModal(false);
        setBulkNewStatus("");
        setSelectOrders([]);
        await getAllOrders();
      }
    } catch (error) {
      console.log(
        "Bulk update error:",
        error.response?.data?.message || error.message,
      );
      alert(error.response?.data?.message || "Failed to update orders");
    } finally {
      setLoading(false);
    }
  };

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

            <button className="flex items-center gap-2 h-9 px-2.5 bg-white font-semibold text-sm rounded-lg  transition hover:bg-[#e8e8e8]">
              <p>Export</p>
            </button>
          </div>
        </div>
        {/* overview */}
        <div className="grid grid-cols-4 gap-4 mb-6 mt-6">
          <div className="bg-[#12151A] border border-[#242932] rounded-xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">Total Orders</p>
              <FiPackage className="text-purple-400" size={20} />
            </div>
            <h2 className="text-2xl font-semibold mt-3">{orders.length}</h2>
          </div>
          <div className="bg-[#12151A] border border-[#242932] rounded-xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">Pending</p>
              <FiClock className="text-yellow-400" size={20} />
            </div>
            <h2 className="text-2xl font-semibold mt-3">
              {orders.filter((order) => order.orderStatus === "Pending").length}
            </h2>
          </div>
          <div className="bg-[#12151A] border border-[#242932] rounded-xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">Shipped</p>
              <FiTruck className="text-blue-400" size={20} />
            </div>
            <h2 className="text-2xl font-semibold mt-3">
              {
                orders.filter(
                  (order) =>
                    order.orderStatus === "Shipped" ||
                    order.orderStatus === "Out for Delivery",
                ).length
              }
            </h2>
          </div>
          <div className="bg-[#12151A] border border-[#242932] rounded-xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">Delivered</p>
              <FiCheckCircle className="text-green-400" size={20} />
            </div>
            <h2 className="text-2xl font-semibold mt-3">
              {
                orders.filter((order) => order.orderStatus === "Delivered")
                  .length
              }
            </h2>
          </div>
        </div>

        <div className="w-full overflow-hidden rounded-2xl border border-[#23272d] bg-[#111417] shadow-[0_10px_40px_rgba(0,0,0,0.18)]  mt-5">
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
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="rounded-lg border border-[#24272c] bg-[#151719] px-4 py-2 text-sm text-white outline-none"
                >
                  <option value="All">All Orders</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <FiChevronDown
                  className=" pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={15}
                />
              </div>
              <div className="relative w-[160px]">
                <select
                  className="h-10 w-full appearance-none rounded-lg border border-[#292f36] bg-[#0b0e10]  px-3  pr-9 text-sm text-gray-400 outline-none focus:border-gray-500 "
                  value={paymentStatusFilter}
                  onChange={(e) => setPaymentStatusFilter(e.target.value)}
                >
                  <option value="All">All Payments</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>

                <FiChevronDown
                  className=" pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={15}
                />
              </div>

              <div>
                <button
                  onClick={() => setBulkOrderStatusModal(true)}
                  disabled={selectOrders.length === 0}
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <MdOutlineLayers size={18} /> Bulk Update
                  <span className="rounded-md bg-white/15 px-2 py-0.5 text-xs">
                    {selectOrders.length}
                  </span>
                </button>
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
                          {tableCell.column.id === "checkbox" && (
                            <input
                              type="checkbox"
                              checked={selectOrders.includes(
                                tablebody.original.orderId,
                              )}
                              onChange={() => {
                                const orderId = tablebody.original.orderId;

                                setSelectOrders((prev) =>
                                  prev.includes(orderId)
                                    ? prev.filter((id) => id !== orderId)
                                    : [...prev, orderId],
                                );
                              }}
                              className="h-4 w-4 cursor-pointer accent-purple-600"
                            />
                          )}

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
                                className={`inline-flex items-center text-xs font-medium ${
                                  value === "Paid"
                                    ? "text-green-400"
                                    : value === "Pending"
                                      ? "text-yellow-400"
                                      : value === "Failed"
                                        ? "text-red-400"
                                        : value === "Refunded"
                                          ? "text-purple-400"
                                          : "text-gray-400"
                                }`}
                              >
                                <span
                                  className={`mr-2 h-1.5 w-1.5 rounded-full ${
                                    value === "Paid"
                                      ? "bg-green-400"
                                      : value === "Pending"
                                        ? "bg-yellow-400"
                                        : value === "Failed"
                                          ? "bg-red-400"
                                          : value === "Refunded"
                                            ? "bg-purple-400"
                                            : "bg-gray-400"
                                  }`}
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
                            : value === "Out for Delivery"
                              ? "border-purple-400/15 bg-purple-400/[0.06] text-purple-400"
                              : value === "Confirmed"
                                ? "border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-400"
                                : value === "Pending"
                                  ? "border-gray-400/15 bg-gray-400/[0.06] text-gray-400"
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
                                onClick={() => {
                                  openStatusModal(tablebody.original);
                                  setOrderids(tablebody.original.orderId);
                                  setBulkOrderIds(tablebody.original.orderId);
                                }}
                                className=" flex h-8 w-8 items-center justify-center rounded-lg text-gray-500  transition-all  duration-200 hover:bg-white/[0.05] hover:text-white"
                              >
                                <FiEdit size={18} />
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

            {updateStatusModal && selectUpdateOrder && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                <div className="w-[400px] rounded-xl border border-white/10 bg-[#12151A] p-6 shadow-2xl">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">
                      Update Order Status
                    </h2>

                    <button
                      type="button"
                      onClick={() => setUpdateStatusModal(false)}
                      className="text-xl text-gray-500 hover:text-white"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-5">
                    <p className="text-sm text-gray-400">Order</p>
                    <p className="mt-1 text-white">{selectUpdateOrder.id}</p>
                  </div>

                  <div className="mb-5">
                    <p className="text-sm text-gray-400">Current Status</p>
                    <p className="mt-1 text-white">
                      {selectUpdateOrder.status}
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-400">
                      New Status
                    </label>

                    <select
                      className="w-full rounded-lg border border-white/10 bg-[#0B0D10] px-3 py-2 text-sm text-white outline-none"
                      defaultValue=""
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="" disabled>
                        Select status
                      </option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setUpdateStatusModal(false)}
                      className="rounded-lg bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={updateOrders}
                      disabled={loading || !newStatus}
                      className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div>
              {bulkOrderStatusModal && selectOrders && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#242932] bg-[#12151A] shadow-2xl">
                      <div className="flex items-center justify-between border-b border-[#242932] p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                            <IoLayersOutline size={23} />
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-white">
                              Bulk Update Orders
                            </h2>
                            <p className="mt-1 text-xs text-gray-400">
                              Update multiple orders at once
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setBulkOrderStatusModal(false);
                            setBulkNewStatus("");
                          }}
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-[#242932] hover:text-white"
                        >
                          <IoClose size={21} />
                        </button>
                      </div>
                      <div className="space-y-5 p-5">
                        <div className="rounded-xl border border-[#2D2547] bg-purple-500/5 p-4">
                          <p className="text-sm text-gray-400">
                            Selected orders
                          </p>
                          <p className="mt-2 text-2xl font-bold text-white">
                            {selectOrders.length}
                          </p>
                          <p className="mt-1 text-xs text-purple-300">
                            Orders selected for status update
                          </p>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-300">
                            New Order Status
                          </label>
                          <div className="relative">
                            <select
                              value={bulkNewStatus}
                              onChange={(e) => setBulkNewStatus(e.target.value)}
                              className="w-full appearance-none rounded-xl border border-[#242932] bg-[#0B0D10] px-4 py-3 pr-10 text-sm text-white outline-none transition focus:border-purple-500"
                            >
                              <option value="">Choose a status</option>
                              {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                            <IoChevronDown
                              size={17}
                              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                          </div>
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Only select a status that is valid for every selected
                          order. Your backend should validate each order's
                          current status.
                        </p>
                        <div className="flex gap-3 pt-1">
                          <button
                            onClick={() => {
                              setBulkOrderStatusModal(false);
                              setBulkNewStatus("");
                            }}
                            className="flex-1 rounded-xl border border-[#242932] px-4 py-3 text-sm font-semibold text-gray-300 transition hover:bg-[#242932]"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={bulkUpdateOrderStatus}
                            disabled={
                              selectOrders.length === 0 ||
                              !bulkNewStatus ||
                              loading
                            }
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <IoLayersOutline size={17} />{" "}
                            {loading
                              ? "Updating Bulk Order..."
                              : "Update Bulk Order"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOrders;
