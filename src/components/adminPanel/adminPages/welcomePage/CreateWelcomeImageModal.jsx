import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiX,
  FiUploadCloud,
  FiImage,
  FiTrash2,
  FiCheck,
  FiActivity,
} from "react-icons/fi";
import axios from "axios";

const CreateWelcomeImageModal = ({ oncloseCreateImageModal, onCreate }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("Active");
  const [isCreating, setIsCreating] = useState(false);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleCreate = async () => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    try {
      setIsCreating(true);

      const formData = new FormData();
      formData.append("welcomeImage", selectedImage);
      formData.append("status", status);

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("userToken");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/createWelcomeImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success || response.status === 200) {
        onCreate?.(response.data);
        oncloseCreateImageModal();
      }
    } catch (error) {
      console.error("Create welcome image error:", error);
      alert(
        error.response?.data?.message ||
          "Failed to upload welcome image"
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={oncloseCreateImageModal}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111318] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <FiImage size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Create Welcome Image
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Upload and configure your welcome page image
                </p>
              </div>
            </div>

            <button
              onClick={oncloseCreateImageModal}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
            {/* Image Upload */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-300">
                Welcome Image
              </label>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {!preview ? (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0D0F13] p-8 text-center transition hover:border-violet-500/50 hover:bg-violet-500/[0.03]"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                    <FiUploadCloud size={28} />
                  </div>

                  <p className="text-sm font-medium text-white">
                    Click to upload image
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    PNG, JPG, WEBP or other image formats
                  </p>
                </button>
              ) : (
                <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0D0F13]">
                  <img
                    src={preview}
                    alt="Welcome preview"
                    className="h-[300px] w-full object-contain"
                  />

                  <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                    <FiCheck className="text-emerald-400" />
                    Image Selected
                  </div>

                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-violet-500"
                    >
                      <FiUploadCloud size={14} />
                      Replace
                    </button>

                    <button
                      type="button"
                      onClick={removeImage}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </div>
              )}

              {selectedImage && (
                <div className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.05] bg-[#0D0F13] px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-gray-300">
                      {selectedImage.name}
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500">
                      {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <FiCheck className="ml-3 shrink-0 text-emerald-400" />
                </div>
              )}
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-5">
              {/* Status */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#0D0F13] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <FiActivity size={17} />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-white">
                      Image Status
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Choose whether this image is active
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="welcomeImageStatus"
                    className="mb-2 block text-xs font-medium text-gray-400"
                  >
                    Status
                  </label>

                  <select
                    id="welcomeImageStatus"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-[#171A20] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500/50"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.05] bg-[#14171D] px-3.5 py-3">
                  <span className="text-xs text-gray-400">
                    Current selection
                  </span>

                  <span
                    className={`flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs font-medium ${
                      status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        status === "Active"
                          ? "bg-emerald-400"
                          : "bg-red-400"
                      }`}
                    />
                    {status}
                  </span>
                </div>
              </div>

              {/* Upload Details */}
              <div className="flex-1 rounded-2xl border border-white/[0.06] bg-[#0D0F13] p-5">
                <h3 className="text-sm font-medium text-white">
                  Upload Details
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  This image will be used on your welcome page. You can
                  control its visibility by changing the status.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Image selected</span>
                    <span
                      className={
                        selectedImage
                          ? "text-emerald-400"
                          : "text-gray-400"
                      }
                    >
                      {selectedImage ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Visibility</span>
                    <span
                      className={
                        status === "Active"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }
                    >
                      {status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">File format</span>
                    <span className="text-gray-300">
                      {selectedImage
                        ? selectedImage.type.split("/")[1]?.toUpperCase()
                        : "Not selected"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-white/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500">
              {selectedImage
                ? "Your image is ready to upload"
                : "Please select an image to continue"}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={oncloseCreateImageModal}
                disabled={isCreating}
                className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm text-gray-400 transition hover:bg-white/[0.04] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                disabled={!selectedImage || isCreating}
                className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isCreating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FiUploadCloud size={16} />
                    Create Welcome Image
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateWelcomeImageModal;