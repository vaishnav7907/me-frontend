import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiX, FiUpload, FiTrash2 } from "react-icons/fi";
import { UseMe } from "../../../../context/Meprovider";

const UpdateBrandOverDisplay = ({ oncloseUpdateBrand }) => {
  const [brandName, setBrandName] = useState("");
  const [brandSlogan, setBrandSlogan] = useState("");
  const [status, setStatus] = useState("Active");

  const [brandIcon, setBrandIcon] = useState(null);
  const [preview, setPreview] = useState("");

  const [brandImage, setBrandImage] = useState(null);
  const [brandImagePreview, setBrandImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingBrand, setLoadingBrand] = useState(true);

  const { brandId } = UseMe();

  const getBrandDetails = async () => {
    try {
      setLoadingBrand(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getBrand/${brandId}`,
      );

      const brand = response.data.brand;

      setBrandName(brand.brandName || "");
      setBrandSlogan(brand.brandSlogan || "");
      setStatus(brand.status || "Active");

      setPreview(brand.brandIcon?.url || "");
      setBrandImagePreview(brand.brandImage?.url || "");

      setBrandIcon(null);
      setBrandImage(null);
    } catch (error) {
      console.log("Error getting brand details:", error);
    } finally {
      setLoadingBrand(false);
    }
  };

  useEffect(() => {
    if (brandId) {
      getBrandDetails();
    }
  }, [brandId]);

  const onChangeImage = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setBrandIcon(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setBrandIcon(null);
    setPreview("");
  };

  const onChangeBrandImage = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setBrandImage(file);
    setBrandImagePreview(URL.createObjectURL(file));
  };

  const removeBrandImage = () => {
    setBrandImage(null);
    setBrandImagePreview("");
  };

  const updateBrand = async () => {
    try {
      setLoading(true);

      const adminToken = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("brandName", brandName);
      formData.append("brandSlogan", brandSlogan);
      formData.append("status", status);

      if (brandIcon instanceof File) {
        formData.append("brandIcon", brandIcon);
      }

      if (brandImage instanceof File) {
        formData.append("brandImage", brandImage);
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

      console.log(
        "updated brands details",
        updtBrandApi.data,
      );

      if (updtBrandApi.data.success) {
        alert("Brand updated successfully");

        setBrandName("");
        setBrandSlogan("");
        setStatus("Active");

        setBrandIcon(null);
        setPreview("");

        setBrandImage(null);
        setBrandImagePreview("");

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
      <div className="max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-neutral-800 bg-[#0d0f12] text-white shadow-2xl">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-800 bg-[#0d0f12] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">
              Update Brand
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Update your brand details and images
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

        {loadingBrand ? (
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-neutral-500">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-700 border-t-white" />
              Loading brand...
            </div>
          </div>
        ) : (
          <>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <section className="rounded-xl border border-neutral-800 bg-[#111419] p-5">
                  <div className="mb-5">
                    <h3 className="text-base font-medium">
                      Brand Information
                    </h3>

                    <p className="mt-1 text-xs text-neutral-500">
                      Update the main information about your brand
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
                        onChange={(e) =>
                          setBrandName(e.target.value)
                        }
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
                        onChange={(e) =>
                          setBrandSlogan(e.target.value)
                        }
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
                  </div>
                </section>

                <section className="rounded-xl border border-neutral-800 bg-[#111419] p-5">
                  <div className="mb-5">
                    <h3 className="text-base font-medium">
                      Brand Icon
                    </h3>

                    <p className="mt-1 text-xs text-neutral-500">
                      Upload a new logo or keep the existing one
                    </p>
                  </div>

                  <label className="flex min-h-[210px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 bg-[#0d0f12] transition hover:border-neutral-500 hover:bg-[#14171c]">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-[#111419]">
                      <FiUpload
                        size={20}
                        className="text-neutral-400"
                      />
                    </div>

                    <p className="text-sm text-neutral-300">
                      Click to replace brand icon
                    </p>

                    <p className="mt-1 text-xs text-neutral-600">
                      PNG, JPG, JPEG or WEBP
                    </p>

                    <input
                      type="file"
                      onChange={onChangeImage}
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      className="hidden"
                    />
                  </label>

                  {preview && (
                    <div className="relative mt-5 flex min-h-[210px] items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-[#0d0f12] p-6">
                      <img
                        alt="Brand Preview"
                        src={preview}
                        className="max-h-[180px] max-w-full object-contain"
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

                    <div className="flex items-center rounded-xl border border-neutral-800 bg-[#0d0f12] p-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-white">
                        {preview ? (
                          <img
                            alt="Brand"
                            src={preview}
                            className="h-full w-full object-contain p-2"
                          />
                        ) : (
                          <span className="text-xs text-neutral-400">
                            Logo
                          </span>
                        )}
                      </div>

                      <div className="ml-4 min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {brandName || "Brand Name"}
                        </p>

                        <p className="mt-1 truncate text-xs text-neutral-500">
                          {brandSlogan || "Brand Slogan"}
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
                </section>

                <section className="rounded-xl border border-neutral-800 bg-[#111419] p-5 lg:col-span-2">
                  <div className="mb-5">
                    <h3 className="text-base font-medium">
                      Brand Background Image
                    </h3>

                    <p className="mt-1 text-xs text-neutral-500">
                      Upload a new image or keep the existing
                      background
                    </p>
                  </div>

                  <label className="flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 bg-[#0d0f12] transition hover:border-neutral-500 hover:bg-[#14171c]">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-[#111419]">
                      <FiUpload
                        size={20}
                        className="text-neutral-400"
                      />
                    </div>

                    <p className="text-sm text-neutral-300">
                      Click to replace brand background image
                    </p>

                    <p className="mt-1 text-xs text-neutral-600">
                      PNG, JPG, JPEG or WEBP
                    </p>

                    <p className="mt-3 text-[10px] uppercase tracking-wider text-neutral-700">
                      Recommended: High quality fashion image
                    </p>

                    <input
                      type="file"
                      onChange={onChangeBrandImage}
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      className="hidden"
                    />
                  </label>

                  {brandImagePreview && (
                    <div className="relative mt-5 overflow-hidden rounded-xl border border-neutral-800">
                      <img
                        src={brandImagePreview}
                        alt="Brand Background"
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
                          alt={brandName}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#15181c]">
                          <span className="text-sm text-neutral-600">
                            No background image
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/40" />

                      <div className="absolute left-5 top-5">
                        <span className="text-sm text-white">
                          Brand
                        </span>
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

                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="text-base font-medium text-white">
                          {brandName || "Brand Name"}
                        </p>

                        <p className="mt-1 text-xs text-white/70">
                          {brandSlogan || "Brand Slogan"}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="sticky bottom-0 flex items-center justify-between border-t border-neutral-800 bg-[#0d0f12] px-6 py-5">
              <div className="text-xs text-neutral-600">
                Update the details or images you want to change
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
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateBrandOverDisplay;