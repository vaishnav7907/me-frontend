import React, { useEffect, useMemo, useState } from "react";
import {
  FiX,
  FiTag,
  FiSearch,
  FiCalendar,
  FiLoader,
  FiCheck,
  FiGift,
} from "react-icons/fi";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const categories = [
  "Shirts",
  "T-Shirts",
  "Pants",
  "Jackets",
  "Innerwear",
  "Shorts",
];

const initialForm = {
  title: "",
  description: "",
  discountType: "percentage",
  discountValue: "",
  buyQuantity: "",
  getQuantity: "",
  applicableTo: "All Products",
  category: "",
  products: [],
  startDate: "",
  endDate: "",
  status: "Inactive",
};

const AddOffer = ({ oncloseOfferModal }) => {
  const [form, setForm] = useState(initialForm);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [creatingOffer, setCreatingOffer] = useState(false);
  const [error, setError] = useState("");

  const token =
   localStorage.getItem("token");

  const isBuyOffer = form.discountType === "buy_x_get_y";

  // Update form fields
  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setError("");
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        const response = await axios.get(`${API}/Me/getProducts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const products =
          response.data.products ||
          response.data.data?.products ||
          response.data.data ||
          [];

        setAllProducts(Array.isArray(products) ? products : []);
      } catch (error) {
        console.error("Product fetching error:", error);
        setError("Unable to load products.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [token]);

  // Change discount type
  const onchangeDiscount = (value) => {
    setForm((prev) => ({
      ...prev,
      discountType: value,
      discountValue: "",
      buyQuantity: "",
      getQuantity: "",
    }));

    setError("");
  };

  // Product image
  const getProductImage = (product) => {
    return (
      product.variants?.[0]?.color?.mainImage?.url ||
      product.images?.[0]?.url ||
      ""
    );
  };

  // Product filtering
  const filteredProducts = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return allProducts.filter((product) => {
      return (
        product.name?.toLowerCase().includes(keyword) ||
        product.brand?.brandName?.toLowerCase().includes(keyword) ||
        product.category?.toLowerCase().includes(keyword) ||
        product.sku?.toLowerCase().includes(keyword)
      );
    });
  }, [allProducts, search]);

  // Selected products
  const selectedProducts = useMemo(() => {
    return allProducts.filter((product) => form.products.includes(product._id));
  }, [allProducts, form.products]);

  // Product selection
  const handleProductChange = (productId) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter((id) => id !== productId)
        : [...prev.products, productId],
    }));

    setError("");
  };

  // Calculate preview price
  const calculateFinalPrice = (product) => {
    const price = Number(product.price);
    const discount = Number(form.discountValue);

    if (!Number.isFinite(price) || price <= 0) {
      return 0;
    }

    if (!form.discountValue || !Number.isFinite(discount) || discount <= 0) {
      return price;
    }

    if (form.discountType === "percentage") {
      return Number(Math.max(0, price - (price * discount) / 100).toFixed(2));
    }

    if (form.discountType === "fixed") {
      return Number(Math.max(0, price - discount).toFixed(2));
    }

    return price;
  };

  // Get product stock and Buy X Get Y bundle capacity
  const getProductStockInfo = (product) => {
    let totalStock = 0;
    let bundleCapacity = 0;

    const buy = Number(form.buyQuantity);
    const get = Number(form.getQuantity);

    const unitsPerBundle = buy + get;

    if (product.variants?.length > 0) {
      product.variants.forEach((variant) => {
        if (variant.sizes?.length > 0) {
          variant.sizes.forEach((size) => {
            const stock = Math.max(0, Number(size.stock) || 0);

            totalStock += stock;

            if (
              isBuyOffer &&
              Number.isInteger(buy) &&
              Number.isInteger(get) &&
              buy > 0 &&
              get > 0
            ) {
              bundleCapacity += Math.floor(stock / unitsPerBundle);
            }
          });
        }
      });
    } else {
      // Fallback if the product uses product-level stock
      totalStock = Math.max(0, Number(product.stock) || 0);

      if (
        isBuyOffer &&
        Number.isInteger(buy) &&
        Number.isInteger(get) &&
        buy > 0 &&
        get > 0
      ) {
        bundleCapacity = Math.floor(totalStock / unitsPerBundle);
      }
    }

    return {
      totalStock,
      bundleCapacity,
    };
  };

  // Currency formatting
  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // Validate form
  const validateForm = () => {
    if (!form.title.trim()) {
      return "Offer title is required.";
    }

    if (!form.description.trim()) {
      return "Offer description is required.";
    }

    // Percentage validation
    if (form.discountType === "percentage") {
      const value = Number(form.discountValue);

      if (
        !form.discountValue ||
        !Number.isFinite(value) ||
        value < 1 ||
        value > 100
      ) {
        return "Percentage must be between 1 and 100.";
      }
    }

    // Fixed discount validation
    if (form.discountType === "fixed") {
      const value = Number(form.discountValue);

      if (!form.discountValue || !Number.isFinite(value) || value <= 0) {
        return "Fixed discount must be greater than zero.";
      }

      if (form.applicableTo === "Products") {
        return "Fixed discounts are not supported for selected products.";
      }
    }

    // Buy X Get Y validation
    if (isBuyOffer) {
      const buy = Number(form.buyQuantity);
      const get = Number(form.getQuantity);

      if (
        !Number.isInteger(buy) ||
        !Number.isInteger(get) ||
        buy <= 0 ||
        get <= 0
      ) {
        return "Buy and get quantities must be positive integers.";
      }
    }

    // Date validation
    if (!form.startDate || !form.endDate) {
      return "Please select both offer dates.";
    }

    if (new Date(form.endDate) <= new Date(form.startDate)) {
      return "End date must be after start date.";
    }

    // Category validation
    if (
      form.applicableTo === "Category" &&
      !categories.includes(form.category)
    ) {
      return "Please select a valid category.";
    }

    // Selected products validation
    if (form.applicableTo === "Products" && form.products.length === 0) {
      return "Please select at least one product.";
    }

    // Check Buy X Get Y stock for selected products
    if (isBuyOffer && form.applicableTo === "Products") {
      const unavailableProducts = selectedProducts.filter((product) => {
        const { bundleCapacity } = getProductStockInfo(product);

        return bundleCapacity < 1;
      });

      if (unavailableProducts.length > 0) {
        return `Insufficient stock to create an offer for: ${unavailableProducts
          .map((product) => product.name)
          .join(", ")}.`;
      }
    }

    // Status validation
    if (!["Active", "Inactive"].includes(form.status)) {
      return "Invalid offer status.";
    }

    return null;
  };

  // Create offer
  const handleCreateOffer = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!token) {
      setError("Authentication token not found. Please log in again.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),

      discountType: form.discountType,

      discountValue: isBuyOffer ? 0 : Number(form.discountValue),

      buyQuantity: isBuyOffer ? Number(form.buyQuantity) : 0,

      getQuantity: isBuyOffer ? Number(form.getQuantity) : 0,

      applicableTo: form.applicableTo,

      category: form.applicableTo === "Category" ? form.category : "",

      products: form.applicableTo === "Products" ? form.products : [],

      startDate: new Date(`${form.startDate}T00:00:00+05:30`).toISOString(),

      endDate: new Date(`${form.endDate}T23:59:59+05:30`).toISOString(),

      status: form.status,
    };

    try {
      setCreatingOffer(true);
      setError("");

      const response = await axios.post(`${API}/Me/createOffer`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Offer created successfully:", response.data);

      oncloseOfferModal();
    } catch (error) {
      console.error("Offer creation error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create offer. Please try again.",
      );
    } finally {
      setCreatingOffer(false);
    }
  };

  // Preview conditions
  const showProductPreview =
    ["percentage", "fixed"].includes(form.discountType) &&
    form.discountValue !== "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#303641] bg-[#12151A] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#303641] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-500/15 p-3 text-purple-400">
              <FiTag size={21} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                Create New Offer
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Configure discounts and promotional campaigns
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={oncloseOfferModal}
            disabled={creatingOffer}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-[#242932] hover:text-white"
          >
            <FiX size={21} />
          </button>
        </div>

        <form
          onSubmit={handleCreateOffer}
          className="space-y-6 overflow-y-auto p-6"
        >
          {/* Basic Information */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400">
              Basic Information
            </h3>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Offer Title
              </label>

              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Example: Summer Special Sale"
                className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Description
              </label>

              <textarea
                rows="3"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe your offer..."
                className="w-full resize-none rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
              />
            </div>
          </section>

          <div className="h-px bg-[#303641]" />

          {/* Discount Configuration */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400">
              Discount Configuration
            </h3>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Discount Type
              </label>

              <select
                value={form.discountType}
                onChange={(e) => onchangeDiscount(e.target.value)}
                className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
              >
                <option value="percentage">Percentage Discount</option>

                <option value="fixed">Fixed Amount Discount</option>

                <option value="buy_x_get_y">Buy X Get Y</option>
              </select>
            </div>

            {/* Percentage */}
            {form.discountType === "percentage" && (
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Discount Percentage (%)
                </label>

                <input
                  type="number"
                  min="1"
                  max="100"
                  step="0.01"
                  value={form.discountValue}
                  onChange={(e) => updateField("discountValue", e.target.value)}
                  placeholder="Example: 20"
                  className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>
            )}

            {/* Fixed Discount */}
            {form.discountType === "fixed" && (
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Discount Amount (₹)
                </label>

                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.discountValue}
                  onChange={(e) => updateField("discountValue", e.target.value)}
                  placeholder="Example: 500"
                  className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>
            )}

            {/* Buy X Get Y */}
            {isBuyOffer && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Buy Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={form.buyQuantity}
                      onChange={(e) =>
                        updateField("buyQuantity", e.target.value)
                      }
                      placeholder="Example: 1"
                      className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Get Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={form.getQuantity}
                      onChange={(e) =>
                        updateField("getQuantity", e.target.value)
                      }
                      placeholder="Example: 1"
                      className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                  <FiGift
                    size={20}
                    className="mt-0.5 shrink-0 text-green-400"
                  />

                  <div>
                    <p className="text-sm font-semibold text-green-400">
                      Buy X Get Y Free
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-300">
                      Customers buy the specified quantity and receive
                      additional units of the same product, color and size for
                      free.
                    </p>

                    {Number(form.buyQuantity) > 0 &&
                      Number(form.getQuantity) > 0 && (
                        <p className="mt-2 text-sm font-semibold text-white">
                          Buy {form.buyQuantity} Get {form.getQuantity} Free
                        </p>
                      )}
                  </div>
                </div>
              </div>
            )}
          </section>

          <div className="h-px bg-[#303641]" />

          {/* Offer Applicability */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400">
              Offer Applicability
            </h3>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Apply Offer To
              </label>

              <select
                value={form.applicableTo}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    applicableTo: e.target.value,
                    category: "",
                    products: [],
                  }));

                  setSearch("");
                  setError("");
                }}
                className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
              >
                <option value="All Products">All Products</option>
                <option value="Category">Specific Category</option>
                <option value="Products">Selected Products</option>
              </select>
            </div>

            {/* Category */}
            {form.applicableTo === "Category" && (
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Select Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                >
                  <option value="">Choose Category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Selected Products */}
            {form.applicableTo === "Products" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-300">
                    Select Products
                  </label>

                  <span className="text-xs text-purple-400">
                    {form.products.length} Selected
                  </span>
                </div>

                {/* Search */}
                <div className="relative">
                  <FiSearch
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={17}
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search product, brand, SKU..."
                    className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-purple-500"
                  />
                </div>

                {/* Selected Product Tags */}
                {selectedProducts.length > 0 && (
                  <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
                    <p className="mb-2 text-xs text-purple-300">
                      Selected Products
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {selectedProducts.map((product) => (
                        <span
                          key={product._id}
                          className="flex items-center gap-2 rounded-md bg-[#242932] px-2 py-1 text-xs text-white"
                        >
                          {product.name}

                          <button
                            type="button"
                            onClick={() => handleProductChange(product._id)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <FiX size={13} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Buy X Get Y Explanation */}
                {isBuyOffer && (
                  <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3">
                    <p className="text-xs leading-5 text-green-400">
                      The offer applies only to selected products. Free units
                      must be the same product, color and size as the purchased
                      units.
                    </p>
                  </div>
                )}

                {/* Product List */}
                <div className="max-h-96 space-y-2 overflow-y-auto rounded-lg border border-[#303641] bg-[#0B0D10] p-3">
                  {loadingProducts ? (
                    <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-400">
                      <FiLoader className="animate-spin" />
                      Loading products...
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <p className="py-8 text-center text-sm text-gray-500">
                      No products found.
                    </p>
                  ) : (
                    filteredProducts.map((product) => {
                      const isSelected = form.products.includes(product._id);

                      const finalPrice = calculateFinalPrice(product);
                      const hasDiscount = showProductPreview;

                      const stockInfo = getProductStockInfo(product);

                      const hasEnoughBundle = stockInfo.bundleCapacity > 0;

                      return (
                        <label
                          key={product._id}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                            isSelected
                              ? "border-purple-500 bg-purple-500/10"
                              : "border-transparent hover:border-[#303641] hover:bg-[#161A21]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleProductChange(product._id)}
                            className="h-4 w-4 accent-purple-500"
                          />

                          <img
                            src={getProductImage(product)}
                            alt={product.name || "Product"}
                            className="h-16 w-14 rounded-md bg-[#242932] object-cover"
                          />

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-white">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {product.brand?.brandName || "No Brand"}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {product.category} · {product.sku}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              Current Price: {formatPrice(product.price)}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              Available Stock:{" "}
                              <span className="font-semibold text-green-400">
                                {stockInfo.totalStock} units
                              </span>
                            </p>

                            {isBuyOffer &&
                              Number(form.buyQuantity) > 0 &&
                              Number(form.getQuantity) > 0 && (
                                <p className="mt-1 text-xs text-gray-400">
                                  Available Offer Bundles:{" "}
                                  <span
                                    className={`font-semibold ${
                                      hasEnoughBundle
                                        ? "text-green-400"
                                        : "text-red-400"
                                    }`}
                                  >
                                    {stockInfo.bundleCapacity}
                                  </span>
                                </p>
                              )}
                          </div>

                          <div className="min-w-24 text-right">
                            {hasDiscount ? (
                              <>
                                <p className="text-xs text-gray-500 line-through">
                                  {formatPrice(product.price)}
                                </p>

                                <p className="mt-1 text-sm font-bold text-purple-400">
                                  {formatPrice(finalPrice)}
                                </p>

                                <p className="text-xs text-green-400">
                                  Final Price
                                </p>
                              </>
                            ) : isBuyOffer ? (
                              <>
                                <p className="text-sm font-semibold text-white">
                                  {formatPrice(product.price)}
                                </p>

                                <p className="mt-1 text-xs text-green-400">
                                  Buy {form.buyQuantity || "X"} Get{" "}
                                  {form.getQuantity || "Y"}
                                </p>
                              </>
                            ) : (
                              <p className="text-sm font-semibold text-white">
                                {formatPrice(product.price)}
                              </p>
                            )}
                          </div>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </section>

          {/* All Products Preview */}
          {form.applicableTo === "All Products" && showProductPreview && (
            <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4">
              <p className="mb-2 text-sm font-semibold text-purple-300">
                Discount Preview
              </p>

              <p className="text-xs text-gray-400">
                The discount will be calculated individually for every eligible
                product using its current price.
              </p>
            </div>
          )}

          {/* Category Preview */}
          {form.applicableTo === "Category" && showProductPreview && (
            <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4">
              <p className="mb-2 text-sm font-semibold text-purple-300">
                Category Discount Preview
              </p>

              <p className="text-xs text-gray-400">
                The discount will apply to eligible products in the selected
                category: {form.category || "Not selected"}.
              </p>
            </div>
          )}

          <div className="h-px bg-[#303641]" />

          {/* Duration */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400">
              Offer Duration
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-gray-300">
                  <FiCalendar />
                  Start Date
                </label>

                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                  className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-gray-300">
                  <FiCalendar />
                  End Date
                </label>

                <input
                  type="date"
                  min={form.startDate || undefined}
                  value={form.endDate}
                  onChange={(e) => updateField("endDate", e.target.value)}
                  className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </section>

          {/* Status */}
          <section>
            <label className="mb-2 block text-sm text-gray-300">
              Offer Status
            </label>

            <select
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
              className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </section>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#303641] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={oncloseOfferModal}
              disabled={creatingOffer}
              className="rounded-lg border border-[#303641] px-6 py-3 text-sm font-medium text-gray-300 transition hover:bg-[#242932] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={creatingOffer || loadingProducts}
              className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creatingOffer ? (
                <>
                  <FiLoader className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <FiCheck />
                  Create Offer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOffer;
