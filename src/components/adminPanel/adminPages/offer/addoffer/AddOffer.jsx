import React, { useState } from "react";
// import { FiX, FiTag } from "react-icons/fi";
import { FiX, FiTag, FiSearch } from "react-icons/fi";
import axios from "axios";
import { useEffect } from "react";
const AddOffer = ({ oncloseOfferModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");
  const [getQuantity, setGetQuantity] = useState("");
  const [applicableTo, setApplicableTo] = useState("All");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const onchangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onchangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onchangeDisount = (e) => {
    setDiscountType(e.target.value);
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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const getProductsApi = await axios.get(
          `${import.meta.env.VITE_API_URL}/Me/getProducts`,
        );

        setAllProducts(getProductsApi.data.products || []);

        console.log("get all products", getProductsApi.data.products);
      } catch (error) {
        console.log("error in get products", error);
        console.log("Server response:", error.response?.data);
      }
    };

    getProducts();
  }, []);

  const createOffer = async (e) => {
    e.preventDefault();

    try {
      const adminToken = localStorage.getItem("token");

      const createOfferApi = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/createOffer`,
        {
          title,
          description,
          discountType,
          discountValue: Number(discountValue) || 0,
          buyQuantity: Number(buyQuantity) || 0,
          getQuantity: Number(getQuantity) || 0,
          startDate,
          endDate,
          status,
          applicableTo,
          category: applicableTo === "Category" ? category : "",
          products: applicableTo === "Products" ? products : [],
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      console.log("Created Offer:", createOfferApi.data);

      alert("Offer created successfully");

      oncloseOfferModal();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to create offer");
    }
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

        <form className="space-y-5" onSubmit={createOffer}>
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
                value={discountType}
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

          {discountType === "buy_x_get_y" ? (
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
                {discountType === "percentage"
                  ? "Discount Percentage (%)"
                  : "Discount Amount (₹)"}
              </label>

              <input
                type="number"
                name="discountValue"
                value={discountValue}
                onChange={onchangeDiscountValue}
                min="0.01"
                max={discountType === "percentage" ? "100" : undefined}
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
              <option value="Products">Specific Products</option>
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

          {applicableTo === "Products" && (
  <div className="space-y-3">
    <label className="text-sm font-medium text-white">
      Select Products
    </label>

    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
        placeholder="Search by product name, brand or category..."
        className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
      />

      {searchProduct && (
        <button
          type="button"
          onClick={() => setSearchProduct("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <FiX size={16} />
        </button>
      )}
    </div>

    <div className="max-h-80 space-y-3 overflow-y-auto rounded-lg border border-[#303641] bg-[#0B0D10] p-4">
      {allProducts.filter((product) => {
        const brandName =
          typeof product.brand === "object"
            ? product.brand?.brandName || product.brand?.name
            : product.brandName || product.brand;

        const searchText = searchProduct.toLowerCase();

        return (
          product.name?.toLowerCase().includes(searchText) ||
          brandName?.toLowerCase().includes(searchText) ||
          product.category?.toLowerCase().includes(searchText)
        );
      }).length > 0 ? (
        allProducts
          .filter((product) => {
            const brandName =
              typeof product.brand === "object"
                ? product.brand?.brandName || product.brand?.name
                : product.brandName || product.brand;

            const searchText = searchProduct.toLowerCase();

            return (
              product.name?.toLowerCase().includes(searchText) ||
              brandName?.toLowerCase().includes(searchText) ||
              product.category?.toLowerCase().includes(searchText)
            );
          })
          .map((product) => {
            const isSelected = products.includes(product._id);

            const image =
              product.variants?.[0]?.color?.mainImage?.url ||
              product.variants?.[0]?.color?.subImages?.[0]?.url ||
              "";

            const brandName =
              typeof product.brand === "object"
                ? product.brand?.brandName || product.brand?.name
                : product.brandName || product.brand;

            const totalStock =
              product.variants?.reduce(
                (total, variant) =>
                  total +
                  (variant.sizes?.reduce(
                    (sum, size) => sum + Number(size.stock || 0),
                    0,
                  ) || 0),
                0,
              ) || 0;

            return (
              <label
                key={product._id}
                className={`flex cursor-pointer items-center gap-4 rounded-lg border p-3 transition ${
                  isSelected
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-[#303641] bg-[#12151A] hover:border-gray-500"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setProducts((prev) => [...prev, product._id]);
                    } else {
                      setProducts((prev) =>
                        prev.filter((id) => id !== product._id),
                      );
                    }
                  }}
                  className="h-4 w-4 shrink-0 accent-purple-500"
                />

                <div className="h-16 w-14 shrink-0 overflow-hidden rounded-md bg-[#242932]">
                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-semibold text-white">
                    {product.name}
                  </h4>

                  <p className="mt-1 text-xs text-gray-400">
                    {brandName || "No Brand"} · {product.category || "Uncategorized"}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-white">
                      ₹{product.price}
                    </span>

                    {product.realPrice > product.price && (
                      <span className="text-xs text-gray-500 line-through">
                        ₹{product.realPrice}
                      </span>
                    )}

                    {product.discount > 0 && (
                      <span className="rounded bg-green-500/10 px-2 py-1 text-[10px] font-medium text-green-400">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>

                  <p
                    className={`mt-1 text-xs ${
                      totalStock === 0 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {totalStock === 0
                      ? "Out of Stock"
                      : `${totalStock} items available`}
                  </p>
                </div>

                {isSelected && (
                  <span className="shrink-0 text-xs font-medium text-purple-400">
                    Selected
                  </span>
                )}
              </label>
            );
          })
      ) : (
        <p className="py-6 text-center text-sm text-gray-500">
          No products found
        </p>
      )}
    </div>

    <p className="text-xs text-gray-400">
      {products.length} products selected
    </p>
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
