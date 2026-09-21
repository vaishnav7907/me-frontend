import axios from "axios";
import React from "react";
import { useState } from "react";
import { FiX, FiImage, FiUpload } from "react-icons/fi";
import { UseMe } from "../../../../context/Meprovider";
const UpdateLatestArrivals = ({ oncloseUpdateLatestArrivals }) => {
  const { latestArrivalsId } = UseMe();
  const [latestArrivalssName, setLatestArrivalssName] = useState("");
  const [latestArrivalssCategory, setLatestArrivalssCategory] = useState("");
  const [latestArrivalssDescription, setLatestArrivalssDescription] =
    useState("");
  const [latestArrivalssImage, setlatestArrivalssImage] = useState(null);
  const [previiew, setPreviiew] = useState("");
  const [loading, setLoading] = useState(false);

  const onchangeImage = (e) => {
    const files = e.target.files[0];
    if (!files) return;
    setlatestArrivalssImage(files);
    setPreviiew(URL.createObjectURL(files));
  };

  const removeImage = () => {
    setlatestArrivalssImage(null);
    setPreviiew("");
  };
  const updateArrivals = async () => {
    try {
      if (!latestArrivalssName) {
        alert("Please Enter Name");
        return;
      }

      if (!latestArrivalssCategory) {
        alert("Please select category");
        return;
      }

      if (!latestArrivalssDescription) {
        alert("Please Enter description");
        return;
      }

      setLoading(true);
      const adminToken = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", latestArrivalssName);
      formData.append("category", latestArrivalssCategory);
      formData.append("description", latestArrivalssDescription);
      if (latestArrivalssImage) {
        formData.append("latestArrivals", latestArrivalssImage);
      }

      const updateLatestArrivalsApi = await axios.patch(
        `${import.meta.env.VITE_API_URL}/Me/updateLatestArrivals/${latestArrivalsId}`,
        formData,
        { headers: { Authorization: `Bearer ${adminToken}` } },
      );

      if (updateLatestArrivalsApi.status === 201) {
        alert("Latest arrival Updated successfully");

        setLatestArrivalssName("");
        setLatestArrivalssCategory("");
        setLatestArrivalssDescription("");
        setlatestArrivalssImage(null);
        setPreviiew("");

        oncloseUpdateLatestArrivals();
      }
    } catch (error) {
      console.error("update latest arrival error:", error);

      alert(error.response?.data?.message || "Failed to update latest arrival");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#292D33] bg-[#111315] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#25282C] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Update Latest Arrival
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Update your collection details.
            </p>
          </div>

          <button
            onClick={oncloseUpdateLatestArrivals}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2C3035] text-gray-400 transition hover:border-[#454A51] hover:bg-[#1A1D20] hover:text-white"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-7 p-6 md:grid-cols-[1fr_280px]">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300">
                Name
              </label>

              <input
                type="text"
                placeholder="Example: New Shirts"
                value={latestArrivalssName}
                onChange={(e) => setLatestArrivalssName(e.target.value)}
                className="h-11 w-full rounded-lg border border-[#2A2E33] bg-[#0B0D10] px-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#555B63]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300">
                Category
              </label>

              <select
                value={latestArrivalssCategory}
                onChange={(e) => setLatestArrivalssCategory(e.target.value)}
                className="h-11 w-full rounded-lg border border-[#2A2E33] bg-[#0B0D10] px-4 text-sm text-gray-300 outline-none focus:border-[#555B63]"
              >
                <option value="" disabled>
                  Select category
                </option>

                <option value="Shirts">Shirts</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Pants">Pants</option>
                <option value="Jackets">Jackets</option>
                <option value="Innerwear">Innerwear</option>
                <option value="Shorts">Shorts</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300">
                Description
              </label>

              <textarea
                rows={6}
                value={latestArrivalssDescription}
                onChange={(e) => setLatestArrivalssDescription(e.target.value)}
                placeholder="Write a short description about this collection..."
                className="w-full resize-none rounded-lg border border-[#2A2E33] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#555B63]"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-300">
              Collection Image
            </label>

            <label className="group relative flex h-[280px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#343940] bg-[#0B0D10] transition hover:border-[#555B63]">
              {previiew ? (
                <>
                  <img
                    src={previiew}
                    alt="Preview"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/30" />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      removeImage();
                    }}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white transition hover:bg-red-500"
                  >
                    <FiX size={16} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 z-10 rounded-lg bg-black/60 px-3 py-2 backdrop-blur-sm">
                    <p className="truncate text-xs text-white">
                      {latestArrivalssImage?.name}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#181B1F] text-gray-500 transition group-hover:bg-[#202328] group-hover:text-white">
                    <FiImage size={20} />
                  </div>

                  <p className="mt-4 text-sm font-medium text-gray-300">
                    Upload image
                  </p>

                  <p className="mt-1 text-xs text-gray-600">PNG, JPG or WEBP</p>

                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#30343A] px-3 py-2 text-xs text-gray-400">
                    <FiUpload size={14} />
                    Choose file
                  </div>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={onchangeImage}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#25282C] px-6 py-4">
          <button
            onClick={oncloseUpdateLatestArrivals}
            className="rounded-lg border border-[#30343A] px-5 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#1A1D20] hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={updateArrivals}
            disabled={loading}
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Latest Arrival"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateLatestArrivals;
