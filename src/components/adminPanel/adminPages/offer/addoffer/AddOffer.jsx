
import React, { useState } from "react";
import { FiX, FiTag } from "react-icons/fi";

const AddOffer = ({ oncloseOfferModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openDiscountType, setOpenDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");
  const [getQuantity, setGetQuantity] = useState("");
  const [applicableTo, setApplicableTo] = useState("All");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Active");

  const onchangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onchangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onchangeDisount = (e) => {
    setOpenDiscountType(e.target.value);
  };

  const onchangeDiscountValue = (e) => {
    setDiscountValue(e.target.value);
  };

  const onchangeBuyQuantity = (e) => {
    setBuyQuantity(e.target.value);
  };

  const onchangeGetQuantity = (e) => {
    setGetQuantity(e.target.value);
  };

  const onchangeApplicableTo = (e) => {
    setApplicableTo(e.target.value);
    setCategory("");
  };

  const onchangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onchangeStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const onchangeEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const onchangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const offerData = {
      title,
      description,
      discountType: openDiscountType,
      discountValue:
        openDiscountType === "buy_x_get_y" ? 0 : Number(discountValue),
      buyQuantity:
        openDiscountType === "buy_x_get_y" ? Number(buyQuantity) : 0,
      getQuantity:
        openDiscountType === "buy_x_get_y" ? Number(getQuantity) : 0,
      applicableTo,
      category: applicableTo === "Category" ? category : "",
      startDate,
      endDate,
      status,
    };

    console.log(offerData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-black/80 px-4 py-5">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-500/10 p-3">
              <FiTag className="text-xl text-purple-400" />
            </div>
            <h1 className="text-xl font-semibold text-white">Add Offer</h1>
          </div>

          <button
            type="button"
            onClick={oncloseOfferModal}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-700 hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        <form  className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Offer Title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={onchangeTitle}
                placeholder="Example: Summer Sale"
                className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Discount Type
              </label>
              <select
                name="discountType"
                value={openDiscountType}
                onChange={onchangeDisount}
                className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
              >
                <option value="percentage">Percentage Discount</option>
                <option value="fixed">Fixed Amount Discount</option>
                <option value="buy_x_get_y">Buy X Get Y</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={onchangeDescription}
              placeholder="Describe your offer"
              rows={3}
              className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
              required
            />
          </div>

          {openDiscountType === "buy_x_get_y" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Buy Quantity
                </label>
                <input
                  type="number"
                  name="buyQuantity"
                  value={buyQuantity}
                  onChange={onchangeBuyQuantity}
                  min="1"
                  placeholder="Buy"
                  className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Get Quantity
                </label>
                <input
                  type="number"
                  name="getQuantity"
                  value={getQuantity}
                  onChange={onchangeGetQuantity}
                  min="1"
                  placeholder="Get"
                  className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                {openDiscountType === "percentage"
                  ? "Discount Percentage (%)"
                  : "Discount Amount (₹)"}
              </label>

              <input
                type="number"
                name="discountValue"
                value={discountValue}
                onChange={onchangeDiscountValue}
                min="0.01"
                max={openDiscountType === "percentage" ? "100" : undefined}
                placeholder="Enter discount value"
                className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                required
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Applicable To
            </label>
            <select
              name="applicableTo"
              value={applicableTo}
              onChange={onchangeApplicableTo}
              className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
            >
              <option value="All">All Products</option>
              <option value="Category">Specific Category</option>
            </select>
          </div>

          {applicableTo === "Category" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Category
              </label>
              <select
                name="category"
                value={category}
                onChange={onchangeCategory}
                className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                required
              >
                <option value="">Select Category</option>
                <option value="Shirts">Shirts</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Pants">Pants</option>
                <option value="Jackets">Jackets</option>
                <option value="Shorts">Shorts</option>
                <option value="Innerwear">Innerwear</option>
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Start Date
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={startDate}
                onChange={onchangeStartDate}
                className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                End Date
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={endDate}
                onChange={onchangeEndDate}
                min={startDate || undefined}
                className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Status
            </label>
            <select
              name="status"
              value={status}
              onChange={onchangeStatus}
              className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-700 pt-5">
            <button
              type="button"
              onClick={oncloseOfferModal}
              className="rounded-lg border border-gray-600 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-700"
            >
              Create Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOffer;
