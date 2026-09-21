import React, { useState } from "react";
import { FiX, FiImage, FiUpload } from "react-icons/fi";
import axios from "axios";

const CreateLatestOverDisplay = ({ oncloseCreateLatestArrivals }) => {
  const [latestArrivalsimage, setLatestArrivalsimage] = useState(null);
  const [preview, setPreview] = useState("");
  const [latestArrivalsName, setLatestArrivalsName] = useState("");
  const [latestArrivalsCategory, setLatestArrivalsCategory] = useState("");
  const [latestArrivalsDescription, setLatestArrivalsDescription] =
    useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLatestArrivalsimage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setLatestArrivalsimage(null);
    setPreview("");
  };

  const createLatestArrivalsfn = async () => {
    if (!latestArrivalsName.trim()) {
      alert("Please Enter Name");
      return;
    }

    if (!latestArrivalsCategory) {
      alert("Please Select Category");
      return;
    }

    if (!latestArrivalsDescription.trim()) {
      alert("Please Enter Description");
      return;
    }

    if (!latestArrivalsimage) {
      alert("Please Select An Image");
      return;
    }

    try {
      const adminToken = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", latestArrivalsName.trim());
      formData.append("category", latestArrivalsCategory);
      formData.append(
        "description",
        latestArrivalsDescription.trim()
      );
      formData.append("latestArrivals", latestArrivalsimage);

      const createArrivalsApi = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/createLatestArrivals`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (createArrivalsApi.status === 201) {
        alert("Latest arrival created successfully");

        setLatestArrivalsName("");
        setLatestArrivalsCategory("");
        setLatestArrivalsDescription("");
        setLatestArrivalsimage(null);
        setPreview("");

        oncloseCreateLatestArrivals();
      }
    } catch (error) {
      console.error("Create latest arrival error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to create latest arrival"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#292D33] bg-[#111315] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#25282C] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Add Latest Arrival
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Create a collection for your storefront.
            </p>
          </div>

          <button
            onClick={oncloseCreateLatestArrivals}
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
                value={latestArrivalsName}
                onChange={(e) =>
                  setLatestArrivalsName(e.target.value)
                }
                className="h-11 w-full rounded-lg border border-[#2A2E33] bg-[#0B0D10] px-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#555B63]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300">
                Category
              </label>

              <select
                value={latestArrivalsCategory}
                onChange={(e) =>
                  setLatestArrivalsCategory(e.target.value)
                }
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
                value={latestArrivalsDescription}
                onChange={(e) =>
                  setLatestArrivalsDescription(e.target.value)
                }
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
              {preview ? (
                <>
                  <img
                    src={preview}
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
                      {latestArrivalsimage?.name}
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

                  <p className="mt-1 text-xs text-gray-600">
                    PNG, JPG or WEBP
                  </p>

                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#30343A] px-3 py-2 text-xs text-gray-400">
                    <FiUpload size={14} />
                    Choose file
                  </div>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#25282C] px-6 py-4">
          <button
            onClick={oncloseCreateLatestArrivals}
            className="rounded-lg border border-[#30343A] px-5 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#1A1D20] hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={createLatestArrivalsfn}
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200"
          >
            Create Latest Arrival
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLatestOverDisplay;