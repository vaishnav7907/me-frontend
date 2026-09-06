import React, { useState } from "react";
import { IoClose, IoAdd } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";

const AddProductOverDisplay = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div
        className="
          w-full
          max-w-6xl
          max-h-[92vh]
          overflow-hidden
          bg-[#0B0D10]
          border
          border-[#292e35]
          rounded-2xl
          shadow-2xl
          flex
          flex-col
        "
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#242932] shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600">
              Store / Products
            </p>

            <h2 className="text-xl font-semibold text-white mt-1">
              Add Product
            </h2>

            <p className="text-xs text-neutral-500 mt-1">
              Add a new product to your ME collection.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-9
              h-9
              rounded-lg
              border
              border-[#292e35]
              bg-[#101318]
              flex
              items-center
              justify-center
              text-neutral-500
              hover:text-white
              hover:bg-[#181b20]
              transition-all
            "
          >
            <IoClose size={20} />
          </button>
        </div>

        <form className="overflow-y-auto">
          <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2 space-y-5">
              <section className="bg-[#101318] border border-[#242932] rounded-xl p-5">
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-white">
                    Basic Information
                  </h3>

                  <p className="text-xs text-neutral-600 mt-1">
                    General information about the product.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-2">
                      Product Name
                    </label>

                    <input
                      name="name"
                      placeholder="Classic White Shirt"
                      className="
                        w-full
                        h-10
                        px-3
                        rounded-lg
                        bg-[#0B0D10]
                        border
                        border-[#292e35]
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-neutral-700
                        focus:border-[#444a53]
                      "
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-2">
                      Description
                    </label>

                    <textarea
                      name="description"
                      rows="4"
                      placeholder="Describe your product..."
                      className="
                        w-full
                        px-3
                        py-3
                        rounded-lg
                        bg-[#0B0D10]
                        border
                        border-[#292e35]
                        text-sm
                        text-white
                        outline-none
                        resize-none
                        placeholder:text-neutral-700
                        focus:border-[#444a53]
                      "
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-2">
                        Category
                      </label>

                      <select
                        name="category"
                        className="
                          w-full
                          h-10
                          px-3
                          rounded-lg
                          bg-[#0B0D10]
                          border
                          border-[#292e35]
                          text-sm
                          text-neutral-300
                          outline-none
                        "
                      >
                        <option value="">Select category</option>

                        <option value="">Shirts</option>
                        <option value="">T-Shirts</option>
                        <option value="">Pants</option>
                        <option value="">Jackets</option>
                        <option value="">Innerwear</option>
                        <option value="">Shorts</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-neutral-400 block mb-2">
                        Brand
                      </label>

                      <input
                        name="brand"
                        placeholder="Nike"
                        className="
                          w-full
                          h-10
                          px-3
                          rounded-lg
                          bg-[#0B0D10]
                          border
                          border-[#292e35]
                          text-sm
                          text-white
                          outline-none
                          placeholder:text-neutral-700
                          focus:border-[#444a53]
                        "
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-2">
                        SKU
                      </label>

                      <input
                        name="sku"
                        placeholder="ME-SHIRT-001"
                        className="
                          w-full
                          h-10
                          px-3
                          rounded-lg
                          bg-[#0B0D10]
                          border
                          border-[#292e35]
                          text-sm
                          text-white
                          outline-none
                          placeholder:text-neutral-700
                        "
                      />
                    </div>

                    <div>
                      <label className="text-xs text-neutral-400 block mb-2">
                        Status
                      </label>

                      <select
                        name="status"
                        className="
                          w-full
                          h-10
                          px-3
                          rounded-lg
                          bg-[#0B0D10]
                          border
                          border-[#292e35]
                          text-sm
                          text-neutral-300
                          outline-none
                        "
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-[#101318] border border-[#242932] rounded-xl p-5">
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-white">Pricing</h3>

                  <p className="text-xs text-neutral-600 mt-1">
                    Set the product pricing.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-2">
                      Selling Price
                    </label>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">
                        ₹
                      </span>

                      <input
                        type="number"
                        name="price"
                        placeholder="1499"
                        className="
                          w-full
                          h-10
                          pl-8
                          pr-3
                          rounded-lg
                          bg-[#0B0D10]
                          border
                          border-[#292e35]
                          text-sm
                          text-white
                          outline-none
                          placeholder:text-neutral-700
                        "
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-2">
                      Original Price
                    </label>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">
                        ₹
                      </span>

                      <input
                        type="number"
                        name="realPrice"
                        placeholder="1999"
                        className="
                          w-full
                          h-10
                          pl-8
                          pr-3
                          rounded-lg
                          bg-[#0B0D10]
                          border
                          border-[#292e35]
                          text-sm
                          text-white
                          outline-none
                          placeholder:text-neutral-700
                        "
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-[#101318] border border-[#242932] rounded-xl p-5">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Variants
                    </h3>

                    <p className="text-xs text-neutral-600 mt-1">
                      Manage colors, sizes and stock.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-1.5
                      h-8
                      px-3
                      rounded-lg
                      border
                      border-[#292e35]
                      bg-[#16191e]
                      text-xs
                      text-neutral-300
                      hover:text-white
                      transition-all
                    "
                  >
                    <IoAdd size={15} />
                    Add Variant
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-[#292e35] bg-[#0C0F12]">
                    <div className="flex justify-between mb-4">
                      <span className="text-[11px] text-neutral-600 uppercase tracking-wider">
                        sss
                      </span>

                      <button
                        type="button"
                        className="text-neutral-600 hover:text-white"
                      >
                        <IoClose size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        placeholder="Color"
                        className="
                            h-10
                            px-3
                            rounded-lg
                            bg-[#101318]
                            border
                            border-[#292e35]
                            text-sm
                            text-white
                            outline-none
                            placeholder:text-neutral-700
                          "
                      />

                      <div className="flex gap-2">
                        <input
                          type="color"
                          className="w-11 h-10 rounded-lg bg-transparent border border-[#292e35]"
                        />

                        <input
                          className="
                              flex-1
                              h-10
                              px-3
                              rounded-lg
                              bg-[#101318]
                              border
                              border-[#292e35]
                              text-sm
                              text-white
                              outline-none
                            "
                        />
                      </div>

                      <input
                        type="number"
                        placeholder="Stock"
                        className="
                            h-10
                            px-3
                            rounded-lg
                            bg-[#101318]
                            border
                            border-[#292e35]
                            text-sm
                            text-white
                            outline-none
                            placeholder:text-neutral-700
                          "
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        type="button"
                        className={`
                                h-8
                                min-w-9
                                px-2.5
                                rounded-md
                                border
                                text-[11px]
                                font-medium
                                transition-all
                                ${"bg-[#101318] text-neutral-500 border-[#292e35] hover:text-white"}
                              `}
                      >
                        M
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div>
              <section className="bg-[#101318] border border-[#242932] rounded-xl p-5 xl:sticky xl:top-0">
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-white">
                    Product Images
                  </h3>

                  <p className="text-xs text-neutral-600 mt-1">
                    Upload product photos.
                  </p>
                </div>

                <label
                  htmlFor="productImages"
                  className="
                    h-44
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-dashed
                    border-[#343941]
                    bg-[#0C0F12]
                    cursor-pointer
                    hover:border-[#555b64]
                    transition-all
                  "
                >
                  <FiUploadCloud size={26} className="text-neutral-500" />

                  <p className="text-sm text-neutral-300 mt-3">Upload images</p>

                  <p className="text-[10px] text-neutral-600 mt-1">
                    PNG, JPG, WEBP
                  </p>

                  <input
                    id="productImages"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                </label>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="relative aspect-square rounded-lg overflow-hidden border border-[#292e35]">
                    <img src="" alt="" className="w-full h-full object-cover" />

                    <button
                      type="button"
                      className="
                            absolute
                            top-1.5
                            right-1.5
                            w-6
                            h-6
                            rounded-md
                            bg-black/70
                            flex
                            items-center
                            justify-center
                            text-white
                          "
                    >
                      <IoClose size={14} />
                    </button>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#242932]">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">Images</span>

                    <span className="text-neutral-400">uploaded</span>
                  </div>

                  <div className="flex justify-between text-xs mt-3">
                    <span className="text-neutral-600">Variants</span>

                    <span className="text-neutral-400">222</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-[#242932] flex justify-end gap-3 sticky bottom-0 bg-[#0B0D10]">
            <button
              type="button"
              onClick={onClose}
              className="
                h-10
                px-5
                rounded-lg
                border
                border-[#292e35]
                bg-[#101318]
                text-sm
                text-neutral-400
                hover:text-white
                transition-all
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                h-10
                px-5
                rounded-lg
                bg-white
                text-black
                text-sm
                font-semibold
                hover:bg-neutral-200
                transition-colors
              "
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductOverDisplay;
