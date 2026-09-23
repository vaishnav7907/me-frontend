import axios from "axios";
import React, { useState } from "react";
import { FiX, FiUpload, FiTrash2 } from "react-icons/fi";

const BrandOverDisplay = ({ onclose }) => {
  const [brandName, setBrandName] = useState("");
  const [brandSlogan, setBrandSlogan] = useState("");

  const [brandIcon, setBrandIcon] = useState(null);
  const [preview, setPreview] = useState("");

  const [brandImage, setBrandImage] = useState(null);
  const [brandImagePreview, setBrandImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [statuss, setStatuss] = useState("Active");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setBrandIcon(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setBrandIcon(null);
    setPreview("");
  };

  const handleBrandImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setBrandImage(file);
    setBrandImagePreview(URL.createObjectURL(file));
  };

  const removeBrandImage = () => {
    setBrandImage(null);
    setBrandImagePreview("");
  };

  const createBrand = async () => {
    try {
      if (!brandName.trim()) {
        alert("Please enter brand name");
        return;
      }

      if (!brandIcon) {
        alert("Please select brand icon");
        return;
      }

      if (!brandImage) {
        alert("Please select brand image");
        return;
      }

      const formData = new FormData();

      formData.append("brandName", brandName);
      formData.append("brandSlogan", brandSlogan);
      formData.append("brandIcon", brandIcon);
      formData.append("brandImage", brandImage);
      formData.append("status", statuss);

      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/createBrand`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        alert("Brand created successfully");

        setBrandName("");
        setBrandSlogan("");

        setBrandIcon(null);
        setPreview("");

        setBrandImage(null);
        setBrandImagePreview("");

        setStatuss("Active");

        onclose();
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while creating brand"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-neutral-800 bg-[#0d0f12] text-white shadow-2xl">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-800 bg-[#0d0f12] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">
              Add New Brand
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Create and manage your brand details
            </p>
          </div>

          <button
            type="button"
            onClick={onclose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 transition hover:border-neutral-600 hover:text-white"
          >
            <FiX size={19} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-neutral-800 bg-[#111419] p-5">
              <div className="mb-5">
                <h3 className="text-base font-medium">
                  Brand Information
                </h3>

                <p className="mt-1 text-xs text-neutral-500">
                  Add the main information about your brand
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-neutral-300">
                    Brand Name
                  </label>

                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) =>
                      setBrandName(e.target.value)
                    }
                    placeholder="Enter brand name"
                    className="h-11 w-full rounded-lg border border-neutral-800 bg-[#0d0f12] px-4 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-neutral-300">
                    Brand Slogan
                  </label>

                  <textarea
                    value={brandSlogan}
                    onChange={(e) =>
                      setBrandSlogan(e.target.value)
                    }
                    placeholder="Enter brand slogan"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-neutral-800 bg-[#0d0f12] px-4 py-3 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-neutral-300">
                    Status
                  </label>

                  <div className="flex gap-3">
                    {["Active", "Inactive"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setStatuss(item)}
                        className={`rounded-lg border px-5 py-2.5 text-sm transition ${
                          statuss === item
                            ? "border-white bg-white text-black"
                            : "border-neutral-800 bg-[#111419] text-neutral-400 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-neutral-800 bg-[#111419] p-5">
              <div className="mb-5">
                <h3 className="text-base font-medium">
                  Brand Icon
                </h3>

                <p className="mt-1 text-xs text-neutral-500">
                  Upload the official logo or icon of the brand
                </p>
              </div>

              {!preview ? (
                <label className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 bg-[#0d0f12] transition hover:border-neutral-500 hover:bg-[#14171c]">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-[#111419]">
                    <FiUpload
                      size={20}
                      className="text-neutral-400"
                    />
                  </div>

                  <p className="text-sm text-neutral-300">
                    Click to upload brand icon
                  </p>

                  <p className="mt-1 text-xs text-neutral-600">
                    PNG, JPG, JPEG or WEBP
                  </p>

                  <p className="mt-3 text-[10px] uppercase tracking-wider text-neutral-700">
                    Recommended: Square logo
                  </p>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative flex min-h-[200px] items-center justify-center rounded-xl border border-neutral-800 bg-[#0d0f12] p-6">
                  <img
                    src={preview}
                    alt="Brand Preview"
                    className="max-h-[170px] max-w-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
                  >
                    <FiTrash2 size={17} />
                  </button>
                </div>
              )}

              <div className="mt-5">
                <p className="mb-3 text-sm font-medium text-white">
                  Logo Preview
                </p>

                <div className="flex items-center rounded-xl border border-green-500/15 bg-green-500/[0.04] p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-white">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Brand"
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <span className="text-xs text-neutral-400">
                          Logo
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {brandName || "Brand Name"}
                      </p>

                      <p className="mt-1 truncate text-xs text-neutral-500">
                        {brandSlogan || "Brand slogan"}
                      </p>

                      <p className="mt-1 text-xs text-green-500">
                        New Brand
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-neutral-800 bg-[#111419] p-5 lg:col-span-2">
              <div className="mb-5">
                <h3 className="text-base font-medium">
                  Brand Background Image
                </h3>

                <p className="mt-1 text-xs text-neutral-500">
                  Upload the fashion image that will appear as the
                  background of the brand card
                </p>
              </div>

              {!brandImagePreview ? (
                <label className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 bg-[#0d0f12] transition hover:border-neutral-500 hover:bg-[#14171c]">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-[#111419]">
                    <FiUpload
                      size={20}
                      className="text-neutral-400"
                    />
                  </div>

                  <p className="text-sm text-neutral-300">
                    Click to upload brand background image
                  </p>

                  <p className="mt-1 text-xs text-neutral-600">
                    PNG, JPG, JPEG or WEBP
                  </p>

                  <p className="mt-3 text-[10px] uppercase tracking-wider text-neutral-700">
                    Recommended: High quality fashion image
                  </p>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleBrandImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative overflow-hidden rounded-xl border border-neutral-800 bg-[#0d0f12]">
                  <img
                    src={brandImagePreview}
                    alt="Brand Background Preview"
                    className="h-[300px] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  <button
                    type="button"
                    onClick={removeBrandImage}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
                  >
                    <FiTrash2 size={17} />
                  </button>
                </div>
              )}

              <div className="mt-5">
                <p className="mb-3 text-sm font-medium text-white">
                  Brand Card Preview
                </p>

                <div className="relative h-[260px] overflow-hidden rounded-xl border border-neutral-800">
                  {brandImagePreview ? (
                    <img
                      src={brandImagePreview}
                      alt="Brand Card"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0d0f12]">
                      <span className="text-sm text-neutral-600">
                        Background image preview
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute left-5 top-5">
                    <span className="text-sm text-white">
                      01
                    </span>

                    <span className="ml-3 inline-block h-px w-7 bg-white/70 align-middle" />
                  </div>

                  {preview && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={preview}
                        alt={brandName}
                        className="max-h-[90px] max-w-[190px] object-contain drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
                      />
                    </div>
                  )}

                  <div className="absolute bottom-5 left-5">
                    <p className="text-sm text-white">
                      Explore →
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center justify-between border-t border-neutral-800 bg-[#0d0f12] px-6 py-5">
          <div className="text-xs text-neutral-600">
            Add brand name, icon and background image to continue
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onclose}
              className="rounded-lg border border-neutral-800 px-5 py-2.5 text-sm text-neutral-400 transition hover:border-neutral-600 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={createBrand}
              disabled={loading}
              className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Brand"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandOverDisplay;