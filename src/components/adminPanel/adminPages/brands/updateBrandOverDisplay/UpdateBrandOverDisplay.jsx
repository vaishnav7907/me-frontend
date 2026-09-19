import axios from "axios";
import React, { useState } from "react";
import { FiX, FiUpload, FiTrash2 } from "react-icons/fi";
import { UseMe } from "../../../../context/Meprovider";
const UpdateBrandOverDisplay = ({ oncloseUpdateBrand }) => {
  const [brandName, setBrandName] = useState("");
  const [brandSlogan, setBrandSlogan] = useState("");
  const [status, setStatus] = useState("Active");
  const [brandIcon, setBrandIcon] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { brandId } = UseMe();

  const onChangeImage = (e) => {
    const files = e.target.files[0];
    if (!files) {
      return;
    }
    setBrandIcon(files);
    setPreview(URL.createObjectURL(files));
  };

  const removeImage = () => {
    setBrandIcon(null);
    setPreview("");
  };

  const updateBrand = async () => {
    try {
      setLoading(true);

      const adminToken = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("brandName", brandName);
      formData.append("brandSlogan", brandSlogan);
      formData.append("status", status);

      if (brandIcon) {
        formData.append("brandIcon", brandIcon);
      }

      const updtBrandApi = await axios.patch(
        `${import.meta.env.VITE_API_URL}/Me/updateBrands/${brandId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      console.log("updated brands details", updtBrandApi.data);

      if (updtBrandApi.data.success) {
        alert("Brand updated successfully");

        setBrandName("");
        setBrandSlogan("");
        setStatus("Active");
        setBrandIcon(null);
        setPreview("");

        oncloseUpdateBrand();
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while updating brand",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-neutral-800 bg-[#0d0f12] text-white shadow-2xl">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-800 bg-[#0d0f12] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">Add New Brand</h2>

            <p className="mt-1 text-sm text-neutral-500">
              Create and manage your brand details
            </p>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 transition hover:border-neutral-600 hover:text-white"
            onClick={oncloseUpdateBrand}
          >
            <FiX size={19} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-neutral-800 bg-[#111419] p-5">
              <div className="mb-5">
                <h3 className="text-base font-medium">Brand Information</h3>

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
                    placeholder="Enter brand name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="h-11 w-full rounded-lg border border-neutral-800 bg-[#0d0f12] px-4 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-neutral-300">
                    Brand Slogan
                  </label>

                  <textarea
                    placeholder="Enter brand slogan"
                    value={brandSlogan}
                    onChange={(e) => setBrandSlogan(e.target.value)}
                    rows={4}
                    className="w-full resize-none rounded-lg border border-neutral-800 bg-[#0d0f12] px-4 py-3 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-500"
                  />
                </div>
                <div className="flex gap-3">
                  {["Active", "Inactive"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStatus(item)}
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
              </div>
            </section>

            <section className="rounded-xl border border-neutral-800 bg-[#111419] p-5">
              <div className="mb-5">
                <h3 className="text-base font-medium">Brand Icon</h3>

                <p className="mt-1 text-xs text-neutral-500">
                  Upload the official logo or icon of the brand
                </p>
              </div>

              <label className="flex min-h-[230px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 bg-[#0d0f12] transition hover:border-neutral-500 hover:bg-[#14171c]">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-[#111419]">
                  <FiUpload size={20} className="text-neutral-400" />
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
                  onChange={onChangeImage}
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                />
              </label>

              {brandIcon && (
                <div className="relative flex min-h-[230px] items-center justify-center rounded-xl border border-neutral-800 bg-[#0d0f12] p-6 mt-5">
                  <img
                    alt="Brand Preview"
                    src={preview}
                    className="max-h-[200px] max-w-full object-contain"
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
                <p className="mb-3 text-sm font-medium text-white">Preview</p>

                <div className="flex items-center rounded-xl border border-green-500/15 bg-green-500/[0.04] p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-white">
                      {preview ? (
                        <img
                          alt="Brand"
                          src={preview}
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <span className="text-xs text-neutral-400">Logo</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        <p>{brandName || "Brand Name"}</p>
                      </p>

                      <p className="mt-1 truncate text-xs text-neutral-500">
                        {brandSlogan || "brand Slogan"}
                      </p>

                      <p
                        className={`mt-1 text-xs ${
                          status === "Active"
                            ? "text-green-500"
                            : "text-red-400"
                        }`}
                      >
                        {status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center justify-between border-t border-neutral-800 bg-[#0d0f12] px-6 py-5">
          <div className="text-xs text-neutral-600">
            Add a brand name and icon to continue
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-neutral-800 px-5 py-2.5 text-sm text-neutral-400 transition hover:border-neutral-600 hover:text-white"
              onClick={oncloseUpdateBrand}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={updateBrand}
              disabled={loading}
              className="flex min-w-[130px] items-center justify-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Updating...
                </>
              ) : (
                "Update Brand"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBrandOverDisplay;
