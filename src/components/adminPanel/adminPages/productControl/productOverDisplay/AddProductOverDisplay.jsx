import React, { useState } from "react";
import {
  FiX,
  FiUpload,
  FiTrash2,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import axios from "axios";
import { UseMe } from "../../../../context/Meprovider";

const AddProductOverDisplay = ({ setAddProduct, onClose }) => {
  const {
    productName,
    setProductName,
    productDescription,
    setProductDescription,
    productCategory,
    setProductCategory,
    productBrandName,
    setProductBrandName,
    productPrice,
    setProductPrice,
    productRealPrice,
    setProductRealPrice,
    productImage,
    setProductImage,
    sku,
    setSku,
    status,
    setStatus,
  } = UseMe();

  const [discount, setDiscount] = useState("");

  const [variants, setVariants] = useState([
    {
      color: {
        name: "",
        code: "#000000",
      },
      sizes: [
        { size: "XS", stock: 0 },
        { size: "S", stock: 0 },
        { size: "M", stock: 0 },
        { size: "L", stock: 0 },
        { size: "XL", stock: 0 },
        { size: "XXL", stock: 0 },
      ],
    },
  ]);

  const [loading, setLoading] = useState(false);

  const calculateDiscount = (realPrice, price) => {
    const original = Number(realPrice);
    const selling = Number(price);

    if (!original || !selling || selling >= original) {
      setDiscount(0);
      return;
    }

    const discountValue = ((original - selling) / original) * 100;

    setDiscount(Math.round(discountValue));
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        color: {
          name: "",
          code: "#000000",
        },
        sizes: [
          { size: "XS", stock: 0 },
          { size: "S", stock: 0 },
          { size: "M", stock: 0 },
          { size: "L", stock: 0 },
          { size: "XL", stock: 0 },
          { size: "XXL", stock: 0 },
        ],
      },
    ]);
  };

  const removeVariant = (variantIndex) => {
    if (variants.length === 1) return;

    setVariants((prev) =>
      prev.filter((_, index) => index !== variantIndex)
    );
  };

  const updateColor = (variantIndex, value) => {
    setVariants((prev) =>
      prev.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              color: {
                ...variant.color,
                name: value,
              },
            }
          : variant
      )
    );
  };

  const updateColorCode = (variantIndex, value) => {
    setVariants((prev) =>
      prev.map((variant, index) => {
        if (index !== variantIndex) {
          return variant;
        }

        return {
          ...variant,
          color: {
            ...variant.color,
            code: value,
          },
        };
      })
    );
  };

  const updateStock = (variantIndex, sizeIndex, value) => {
    const stock = Math.max(0, Number(value) || 0);

    setVariants((prev) =>
      prev.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              sizes: variant.sizes.map((item, index) =>
                index === sizeIndex
                  ? {
                      ...item,
                      stock,
                    }
                  : item
              ),
            }
          : variant
      )
    );
  };

  const getTotalStock = () => {
    return variants.reduce(
      (total, variant) =>
        total +
        variant.sizes.reduce(
          (sizeTotal, size) =>
            sizeTotal + Number(size.stock || 0),
          0
        ),
      0
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setProductImage((prev) => [...prev, ...files]);

    e.target.value = "";
  };

  const removeImage = (imageIndex) => {
    setProductImage((prev) =>
      prev.filter((_, index) => index !== imageIndex)
    );
  };

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setProductCategory("");
    setProductBrandName("");
    setProductPrice("");
    setProductRealPrice("");
    setProductImage([]);
    setSku("");
    setStatus("Active");
    setDiscount("");

    setVariants([
      {
        color: {
          name: "",
          code: "#000000",
        },
        sizes: [
          { size: "XS", stock: 0 },
          { size: "S", stock: 0 },
          { size: "M", stock: 0 },
          { size: "L", stock: 0 },
          { size: "XL", stock: 0 },
          { size: "XXL", stock: 0 },
        ],
      },
    ]);
  };

  const createProduct = async () => {
    if (!productName.trim()) {
      alert("Product name is required");
      return;
    }

    if (!productDescription.trim()) {
      alert("Product description is required");
      return;
    }

    if (!productCategory) {
      alert("Please select a category");
      return;
    }

    if (!productBrandName.trim()) {
      alert("Brand name is required");
      return;
    }

    if (!productPrice || Number(productPrice) <= 0) {
      alert("Enter a valid selling price");
      return;
    }

    if (!productRealPrice || Number(productRealPrice) <= 0) {
      alert("Enter a valid real price");
      return;
    }

    if (Number(productRealPrice) < Number(productPrice)) {
      alert(
        "Real price should be greater than or equal to selling price"
      );
      return;
    }

    if (!sku.trim()) {
      alert("SKU is required");
      return;
    }

    if (!productImage.length) {
      alert("Please upload at least one product image");
      return;
    }

    if (!variants.length) {
      alert("Please add at least one variant");
      return;
    }

    const invalidVariant = variants.some(
      (variant) => !variant.color.name.trim()
    );

    if (invalidVariant) {
      alert("Please enter color name for every variant");
      return;
    }

    const invalidColorCode = variants.some(
      (variant) =>
        !/^#[0-9A-Fa-f]{6}$/.test(variant.color.code)
    );

    if (invalidColorCode) {
      alert(
        "Please enter a valid color code like #000000"
      );
      return;
    }

    const totalStock = getTotalStock();

    if (totalStock <= 0) {
      alert("Product stock must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      const realPrice = Number(productRealPrice);
      const price = Number(productPrice);

      const calculatedDiscount =
        realPrice > 0 && price < realPrice
          ? Math.round(
              ((realPrice - price) / realPrice) * 100
            )
          : 0;

      const formData = new FormData();

      formData.append("name", productName.trim());
      formData.append(
        "description",
        productDescription.trim()
      );
      formData.append("category", productCategory);
      formData.append(
        "brandName",
        productBrandName.trim()
      );
      formData.append("price", price);
      formData.append("realPrice", realPrice);
      formData.append("discount", calculatedDiscount);
      formData.append("stock", totalStock);
      formData.append("sku", sku.trim());
      formData.append("status", status);
      formData.append(
        "variants",
        JSON.stringify(variants)
      );

      productImage.forEach((image) => {
        formData.append("images", image);
      });

      const adminToken =
        localStorage.getItem("token");

      if (!adminToken) {
        alert(
          "Admin token not found. Please login again."
        );
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/createDress`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Product created successfully");

        resetForm();

        setAddProduct(false);
      }
    } catch (error) {
      console.error(
        "Create product error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-6xl max-h-[94vh] overflow-y-auto rounded-2xl border border-neutral-800 bg-[#0d0f12] text-white shadow-2xl">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-800 bg-[#0d0f12] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">
              Add New Product
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Create and manage your product details
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 transition hover:border-neutral-600 hover:text-white"
          >
            <FiX size={19} />
          </button>
        </div>

        <div className="space-y-8 p-6">
          <section>
            <div className="mb-5">
              <h3 className="text-base font-medium">
                Basic Information
              </h3>

              <p className="mt-1 text-xs text-neutral-500">
                Add the main information about your product
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-neutral-300">
                  Product Name
                </label>

                <input
                  type="text"
                  value={productName}
                  onChange={(e) =>
                    setProductName(e.target.value)
                  }
                  placeholder="Enter product name"
                  className="h-11 w-full rounded-lg border border-neutral-800 bg-[#12151a] px-4 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-neutral-300">
                  Description
                </label>

                <textarea
                  value={productDescription}
                  onChange={(e) =>
                    setProductDescription(e.target.value)
                  }
                  placeholder="Enter product description"
                  rows={5}
                  className="w-full resize-none rounded-lg border border-neutral-800 bg-[#12151a] px-4 py-3 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Category
                </label>

                <select
                  value={productCategory}
                  onChange={(e) =>
                    setProductCategory(e.target.value)
                  }
                  className="h-11 w-full rounded-lg border border-neutral-800 bg-[#12151a] px-4 text-sm outline-none focus:border-neutral-500"
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Shirts">
                    Shirts
                  </option>

                  <option value="Pants">
                    Pants
                  </option>

                  <option value="Jackets">
                    Jackets
                  </option>

                  <option value="Innerwear">
                    Innerwear
                  </option>

                  <option value="Shorts">
                    Shorts
                  </option>

                  <option value="T-Shirts">
                    T-Shirts
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Brand
                </label>

                <input
                  type="text"
                  value={productBrandName}
                  onChange={(e) =>
                    setProductBrandName(e.target.value)
                  }
                  placeholder="Enter brand name"
                  className="h-11 w-full rounded-lg border border-neutral-800 bg-[#12151a] px-4 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-500"
                />
              </div>
            </div>
          </section>

          <section className="border-t border-neutral-800 pt-8">
            <div className="mb-5">
              <h3 className="text-base font-medium">
                Pricing & Inventory
              </h3>

              <p className="mt-1 text-xs text-neutral-500">
                Set pricing and inventory information
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Selling Price
                </label>

                <input
                  type="number"
                  min="0"
                  value={productPrice}
                  onChange={(e) => {
                    const value = e.target.value;

                    setProductPrice(value);

                    calculateDiscount(
                      productRealPrice,
                      value
                    );
                  }}
                  placeholder="0.00"
                  className="h-11 w-full rounded-lg border border-neutral-800 bg-[#12151a] px-4 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Real Price
                </label>

                <input
                  type="number"
                  min="0"
                  value={productRealPrice}
                  onChange={(e) => {
                    const value = e.target.value;

                    setProductRealPrice(value);

                    calculateDiscount(
                      value,
                      productPrice
                    );
                  }}
                  placeholder="0.00"
                  className="h-11 w-full rounded-lg border border-neutral-800 bg-[#12151a] px-4 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Discount
                </label>

                <div className="relative">
                  <input
                    type="text"
                    value={discount}
                    readOnly
                    placeholder="0"
                    className="h-11 w-full rounded-lg border border-neutral-800 bg-[#12151a] px-4 pr-10 text-sm outline-none placeholder:text-neutral-600"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  SKU
                </label>

                <input
                  type="text"
                  value={sku}
                  onChange={(e) =>
                    setSku(
                      e.target.value.toUpperCase()
                    )
                  }
                  placeholder="ME-SHIRT-001"
                  className="h-11 w-full rounded-lg border border-neutral-800 bg-[#12151a] px-4 text-sm uppercase outline-none placeholder:text-neutral-600"
                />
              </div>
            </div>
          </section>

          <section className="border-t border-neutral-800 pt-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">
                  Product Variants
                </h3>

                <p className="mt-1 text-xs text-neutral-500">
                  Add colors and stock for each size
                </p>
              </div>

              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 rounded-lg border border-neutral-700 px-3 py-2 text-sm transition hover:border-neutral-500 hover:bg-neutral-900"
              >
                <FiPlus size={16} />
                Add Variant
              </button>
            </div>

            <div className="space-y-5">
              {variants.map(
                (variant, variantIndex) => (
                  <div
                    key={variantIndex}
                    className="rounded-xl border border-neutral-800 bg-[#111419] p-5"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Variant {variantIndex + 1}
                      </span>

                      {variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeVariant(
                              variantIndex
                            )
                          }
                          className="flex items-center gap-2 text-xs text-neutral-500 transition hover:text-white"
                        >
                          <FiTrash2 size={15} />
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm text-neutral-300">
                          Color Name
                        </label>

                        <input
                          type="text"
                          value={
                            variant.color.name
                          }
                          onChange={(e) =>
                            updateColor(
                              variantIndex,
                              e.target.value
                            )
                          }
                          placeholder="Black"
                          className="h-11 w-full rounded-lg border border-neutral-800 bg-[#0d0f12] px-4 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm text-neutral-300">
                          Color Code
                        </label>

                        <div className="flex h-11 items-center gap-3 rounded-lg border border-neutral-800 bg-[#0d0f12] px-3">
                          <input
                            type="color"
                            value={
                              /^#[0-9A-Fa-f]{6}$/.test(
                                variant.color.code
                              )
                                ? variant.color.code
                                : "#000000"
                            }
                            onChange={(e) =>
                              updateColorCode(
                                variantIndex,
                                e.target.value
                              )
                            }
                            className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
                          />

                          <input
                            type="text"
                            value={
                              variant.color.code
                            }
                            onChange={(e) =>
                              updateColorCode(
                                variantIndex,
                                e.target.value
                              )
                            }
                            placeholder="#000000"
                            maxLength={7}
                            className="h-8 w-full bg-transparent text-sm text-neutral-300 uppercase outline-none placeholder:text-neutral-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-3 flex items-center justify-between">
                        <label className="block text-sm text-neutral-300">
                          Size & Stock
                        </label>

                        <span className="text-xs text-neutral-500">
                          Variant Stock:{" "}
                          <span className="text-white">
                            {variant.sizes.reduce(
                              (total, size) =>
                                total +
                                Number(
                                  size.stock || 0
                                ),
                              0
                            )}
                          </span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                        {variant.sizes.map(
                          (
                            sizeItem,
                            sizeIndex
                          ) => (
                            <div
                              key={sizeItem.size}
                              className="rounded-lg border border-neutral-800 bg-[#0d0f12] p-3"
                            >
                              <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  {sizeItem.size}
                                </span>

                                <span className="text-[10px] uppercase tracking-wider text-neutral-600">
                                  Stock
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateStock(
                                      variantIndex,
                                      sizeIndex,
                                      sizeItem.stock -
                                        1
                                    )
                                  }
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 transition hover:border-neutral-600 hover:text-white"
                                >
                                  <FiMinus
                                    size={13}
                                  />
                                </button>

                                <input
                                  type="number"
                                  min="0"
                                  value={
                                    sizeItem.stock
                                  }
                                  onChange={(e) =>
                                    updateStock(
                                      variantIndex,
                                      sizeIndex,
                                      e.target.value
                                    )
                                  }
                                  className="h-8 min-w-0 w-full rounded-md border border-neutral-800 bg-[#111419] text-center text-xs outline-none focus:border-neutral-600"
                                />

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateStock(
                                      variantIndex,
                                      sizeIndex,
                                      sizeItem.stock +
                                        1
                                    )
                                  }
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 transition hover:border-neutral-600 hover:text-white"
                                >
                                  <FiPlus
                                    size={13}
                                  />
                                </button>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-neutral-800 bg-[#111419] px-5 py-4">
              <div>
                <p className="text-sm font-medium">
                  Total Product Stock
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  Combined stock across all colors
                  and sizes
                </p>
              </div>

              <span className="text-2xl font-semibold">
                {getTotalStock()}
              </span>
            </div>
          </section>

          <section className="border-t border-neutral-800 pt-8">
            <div className="mb-5">
              <h3 className="text-base font-medium">
                Product Images
              </h3>

              <p className="mt-1 text-xs text-neutral-500">
                Upload high-quality images of your
                product
              </p>
            </div>

            <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 bg-[#111419] transition hover:border-neutral-500 hover:bg-[#14171c]">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-[#0d0f12]">
                <FiUpload
                  size={20}
                  className="text-neutral-400"
                />
              </div>

              <p className="text-sm text-neutral-300">
                Click to upload images
              </p>

              <p className="mt-1 text-xs text-neutral-600">
                PNG, JPG, JPEG or WEBP
              </p>

              <input
                type="file"
                multiple
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {productImage.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {productImage.map(
                  (image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="group relative overflow-hidden rounded-lg border border-neutral-800 bg-[#111419]"
                    >
                      <img
                        src={URL.createObjectURL(
                          image
                        )}
                        alt={image.name}
                        className="aspect-square w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index)
                        }
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md bg-black/80 text-neutral-300 opacity-0 transition group-hover:opacity-100 hover:text-white"
                      >
                        <FiTrash2 size={15} />
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 truncate bg-black/70 px-2 py-2 text-[10px] text-neutral-300">
                        {image.name}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </section>

          <section className="border-t border-neutral-800 pt-8">
            <div className="mb-5">
              <h3 className="text-base font-medium">
                Product Status
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                "Active",
                "Inactive",
                "Draft",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setStatus(item)
                  }
                  className={`rounded-lg border px-5 py-2.5 text-sm transition ${
                    status === item
                      ? "border-white bg-white text-black"
                      : "border-neutral-800 bg-[#111419] text-neutral-400 hover:border-neutral-600 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-neutral-800 bg-[#0d0f12] px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-neutral-800 px-5 py-2.5 text-sm text-neutral-400 transition hover:border-neutral-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={createProduct}
            disabled={loading}
            className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductOverDisplay;