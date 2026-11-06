
import React, { useState, useEffect } from "react";
import {
  FiX,
  FiTag,
  FiSearch,
  FiCalendar,
  FiLoader,
  FiCheck,
} from "react-icons/fi";
import axios from "axios";
import { UseMe } from "../../../../context/Meprovider";

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

const formatDateForInput = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(parsedDate);
};

const UpdateOffer = ({ oncloseUpdateOfferModal }) => {
  const { offerId } = UseMe();

  const [form, setForm] = useState(initialForm);

  const [allProducts, setAllProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingOffer, setLoadingOffer] = useState(true);
  const [updatingOffer, setUpdatingOffer] = useState(false);

  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Product selection
  const handleProductChange = (productId) => {
    const selectedId = String(productId);

    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(selectedId)
        ? prev.products.filter((id) => id !== selectedId)
        : [...prev.products, selectedId],
    }));
  };

  // Selected products
  const selectedProducts = allProducts.filter((product) =>
    form.products.includes(String(product._id))
  );

  // Product search
  const filteredProducts = allProducts.filter((product) => {
    const search = searchProduct.toLowerCase().trim();

    return (
      product.name?.toLowerCase().includes(search) ||
      product.brand?.brandName?.toLowerCase().includes(search) ||
      product.sku?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search)
    );
  });

  // Product image
  const getProductImage = (product) => {
    return (
      product.variants?.[0]?.color?.mainImage?.url ||
      product.images?.[0]?.url ||
      ""
    );
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(price) || 0);
  };

  // Calculate discounted price preview
  const calculateFinalPrice = (product) => {
    const price = Number(product.price);
    const discount = Number(form.discountValue);

    if (
      !Number.isFinite(price) ||
      !Number.isFinite(discount) ||
      discount <= 0 ||
      discount > 100
    ) {
      return price;
    }

    return Number(
      (price - (price * discount) / 100).toFixed(2)
    );
  };

  const showProductPreview =
    form.discountType === "percentage" &&
    Number(form.discountValue) > 0 &&
    Number(form.discountValue) <= 100;

  // Get existing offer
  const getOffers = async () => {
    try {
      const response = await axios.get(`${API}/Me/getOffers`);

      const offerData =
        response.data.getOfferData ||
        response.data.offers ||
        [];

      const offer = offerData.find(
        (item) => String(item._id) === String(offerId)
      );

      if (!offer) {
        setError("Offer not found");
        return;
      }

      setForm({
        title: offer.title || "",
        description: offer.description || "",
        discountType: offer.discountType || "percentage",
        discountValue: offer.discountValue ?? "",
        buyQuantity: offer.buyQuantity ?? "",
        getQuantity: offer.getQuantity ?? "",
        applicableTo: offer.applicableTo || "All Products",
        category: offer.category || "",

        products:
          offer.products?.map((item) =>
            String(
              typeof item === "object" ? item._id : item
            )
          ) || [],

        startDate: formatDateForInput(offer.startDate),
        endDate: formatDateForInput(offer.endDate),
        status: offer.status || "Inactive",
      });
    } catch (error) {
      console.error("Get Offer Error:", error);
      setError(
        error.response?.data?.message ||
          "Failed to load offer details"
      );
    } finally {
      setLoadingOffer(false);
    }
  };

  // Get all products
  const getProducts = async () => {
    try {
      setLoadingProducts(true);

      const response = await axios.get(
        `${API}/Me/getProducts`
      );

      const productData =
        response.data.getProductsData ||
        response.data.getProductData ||
        response.data.products ||
        [];

      setAllProducts(
        Array.isArray(productData) ? productData : []
      );
    } catch (error) {
      console.error("Get Products Error:", error);
      setError(
        error.response?.data?.message ||
          "Failed to load products"
      );
    } finally {
      setLoadingProducts(false);
    }
  };

  // Load offer and products
  useEffect(() => {
    if (offerId) {
      getOffers();
      getProducts();
    } else {
      setLoadingOffer(false);
      setError("Offer ID not found");
    }
  }, [offerId]);

  // Update offer
  const updateOfferFn = async (e) => {
    e.preventDefault();

    setError("");

    if (!offerId) {
      setError("Offer ID not found");
      return;
    }

    if (!form.title.trim() || !form.description.trim()) {
      setError("Please provide offer title and description");
      return;
    }

    if (
      form.applicableTo === "Products" &&
      form.discountType !== "percentage"
    ) {
      setError(
        "Selected Products currently supports percentage discounts only"
      );
      return;
    }

    if (
      form.applicableTo === "Products" &&
      form.products.length === 0
    ) {
      setError("Please select at least one product");
      return;
    }

    if (
      form.applicableTo === "Category" &&
      !form.category
    ) {
      setError("Please select a category");
      return;
    }

    if (
      form.discountType === "percentage" &&
      (
        !Number.isFinite(Number(form.discountValue)) ||
        Number(form.discountValue) <= 0 ||
        Number(form.discountValue) > 100
      )
    ) {
      setError("Percentage must be between 1 and 100");
      return;
    }

    if (
      form.discountType === "fixed" &&
      (
        !Number.isFinite(Number(form.discountValue)) ||
        Number(form.discountValue) <= 0
      )
    ) {
      setError("Please provide a valid discount amount");
      return;
    }

    if (
      form.discountType === "buy_x_get_y" &&
      (
        !Number.isInteger(Number(form.buyQuantity)) ||
        !Number.isInteger(Number(form.getQuantity)) ||
        Number(form.buyQuantity) <= 0 ||
        Number(form.getQuantity) <= 0
      )
    ) {
      setError(
        "Buy and get quantities must be positive integers"
      );
      return;
    }

    if (
      !form.startDate ||
      !form.endDate ||
      form.endDate < form.startDate
    ) {
      setError("Please select valid offer dates");
      return;
    }

    try {
      setUpdatingOffer(true);

      const adminToken =
        localStorage.getItem("token") ||
        localStorage.getItem("userToken");

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),

        discountType: form.discountType,

        discountValue:
          form.discountType === "buy_x_get_y"
            ? 0
            : Number(form.discountValue),

        buyQuantity:
          form.discountType === "buy_x_get_y"
            ? Number(form.buyQuantity)
            : 0,

        getQuantity:
          form.discountType === "buy_x_get_y"
            ? Number(form.getQuantity)
            : 0,

        applicableTo: form.applicableTo,

        category:
          form.applicableTo === "Category"
            ? form.category
            : "",

        products:
          form.applicableTo === "Products"
            ? form.products
            : [],

        startDate: new Date(
          `${form.startDate}T00:00:00+05:30`
        ).toISOString(),

        endDate: new Date(
          `${form.endDate}T23:59:59+05:30`
        ).toISOString(),

        status: form.status,
      };

      const response = await axios.patch(
        `${API}/Me/updateOffer/${offerId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      alert(
        response.data.message ||
          "Offer updated successfully"
      );

      oncloseUpdateOfferModal();
    } catch (error) {
      console.error("Update Offer Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update offer"
      );
    } finally {
      setUpdatingOffer(false);
    }
  };

  if (loadingOffer) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="flex items-center gap-3 text-white">
          <FiLoader className="animate-spin" size={22} />
          Loading offer...
        </div>
      </div>
    );
  }

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
                Update Offer
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Update discounts and promotional campaigns
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={oncloseUpdateOfferModal}
            disabled={updatingOffer}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-[#242932] hover:text-white"
          >
            <FiX size={21} />
          </button>
        </div>

        <form
          onSubmit={updateOfferFn}
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
                required
                value={form.title}
                onChange={(e) =>
                  updateField("title", e.target.value)
                }
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
                required
                value={form.description}
                onChange={(e) =>
                  updateField("description", e.target.value)
                }
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
                onChange={(e) =>
                  updateField("discountType", e.target.value)
                }
                className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
              >
                <option value="percentage">
                  Percentage Discount
                </option>

                <option value="fixed">
                  Fixed Amount Discount
                </option>

                <option value="buy_x_get_y">
                  Buy X Get Y
                </option>
              </select>
            </div>

            {form.discountType === "percentage" && (
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Discount Percentage (%)
                </label>

                <input
                  type="number"
                  required
                  min="1"
                  max="100"
                  step="0.01"
                  value={form.discountValue}
                  onChange={(e) =>
                    updateField("discountValue", e.target.value)
                  }
                  placeholder="Example: 20"
                  className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>
            )}

            {form.discountType === "fixed" && (
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Discount Amount (₹)
                </label>

                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  value={form.discountValue}
                  onChange={(e) =>
                    updateField("discountValue", e.target.value)
                  }
                  placeholder="Example: 500"
                  className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>
            )}

            {form.discountType === "buy_x_get_y" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Buy Quantity
                  </label>

                  <input
                    type="number"
                    required
                    min="1"
                    step="1"
                    value={form.buyQuantity}
                    onChange={(e) =>
                      updateField("buyQuantity", e.target.value)
                    }
                    placeholder="Example: 2"
                    className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Get Quantity
                  </label>

                  <input
                    type="number"
                    required
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
            )}

            {form.applicableTo === "Products" &&
              form.discountType !== "percentage" && (
                <p className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-400">
                  Selected Products currently supports percentage
                  discounts only. Choose percentage to update this offer.
                </p>
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
                  updateField("applicableTo", e.target.value);
                  setSearchProduct("");
                }}
                className="w-full rounded-lg border border-[#303641] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
              >
                <option value="All Products">
                  All Products
                </option>

                <option value="Category">
                  Specific Category
                </option>

                <option value="Products">
                  Selected Products
                </option>
              </select>
            </div>

            {/* Category */}
            {form.applicableTo === "Category" && (
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Select Category
                </label>

                <select
                  required
                  value={form.category}
                  onChange={(e) =>
                    updateField("category", e.target.value)
                  }
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
                    value={searchProduct}
                    onChange={(e) =>
                      setSearchProduct(e.target.value)
                    }
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
                            onClick={() =>
                              handleProductChange(product._id)
                            }
                            className="text-gray-400 hover:text-red-400"
                          >
                            <FiX size={13} />
                          </button>
                        </span>
                      ))}
                    </div>
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
                      const isSelected = form.products.includes(
                        String(product._id)
                      );

                      const finalPrice =
                        calculateFinalPrice(product);

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
                            onChange={() =>
                              handleProductChange(product._id)
                            }
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
                          </div>

                          <div className="min-w-24 text-right">
                            {showProductPreview ? (
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
          {form.applicableTo === "All Products" &&
            showProductPreview && (
              <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4">
                <p className="mb-2 text-sm font-semibold text-purple-300">
                  Discount Preview
                </p>

                <p className="text-xs text-gray-400">
                  The discount will be calculated individually for
                  every eligible product using its current price.
                </p>
              </div>
            )}

          {/* Category Preview */}
          {form.applicableTo === "Category" &&
            showProductPreview && (
              <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4">
                <p className="mb-2 text-sm font-semibold text-purple-300">
                  Category Discount Preview
                </p>

                <p className="text-xs text-gray-400">
                  The discount will apply to eligible products in
                  the selected category:{" "}
                  {form.category || "Not selected"}.
                </p>
              </div>
            )}

          <div className="h-px bg-[#303641]" />

          {/* Offer Duration */}
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
                  required
                  value={form.startDate}
                  onChange={(e) =>
                    updateField("startDate", e.target.value)
                  }
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
                  required
                  min={form.startDate || undefined}
                  value={form.endDate}
                  onChange={(e) =>
                    updateField("endDate", e.target.value)
                  }
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
              onChange={(e) =>
                updateField("status", e.target.value)
              }
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
              onClick={oncloseUpdateOfferModal}
              disabled={updatingOffer}
              className="rounded-lg border border-[#303641] px-6 py-3 text-sm font-medium text-gray-300 transition hover:bg-[#242932] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                updatingOffer ||
                loadingProducts ||
                (form.applicableTo === "Products" &&
                  form.discountType !== "percentage")
              }
              className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updatingOffer ? (
                <>
                  <FiLoader className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <FiCheck />
                  Update Offer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOffer;
