import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiX,
  FiUploadCloud,
  FiImage,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";
import axios from "axios";

const UpdateWelcomeImageModal = ({
  oncloseUpdateImageModal,
  currentImage,
  currentStatus,
  onUpdate,
  selectedid
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState(currentStatus || "Active");
  const [isUpdating, setIsUpdating] = useState(false);

  const fileRef = useRef(null);

  useEffect(() => {
    setStatus(currentStatus || "Active");
  }, [currentStatus]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      e.target.value = "";
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreview(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleUpdate = async () => {
    const originalStatus = currentStatus || "Active";

    const statusChanged = status !== originalStatus;
    const imageChanged = selectedImage !== null;

    if (!statusChanged && !imageChanged) {
      alert("No changes to update");
      return;
    }

    try {
      setIsUpdating(true);

      const formData = new FormData();

      if (imageChanged) {
        formData.append("welcomeImage", selectedImage);
      }

      if (statusChanged) {
        formData.append("status", status);
      }

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("userToken");

      const updateImg = await axios.patch(
        `${import.meta.env.VITE_API_URL}/Me/updateWelcomeImage/${selectedid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (updateImg.data.success) {
        onUpdate?.(updateImg.data);
        oncloseUpdateImageModal();
      }
    } catch (error) {
      console.error("Update welcome image error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update welcome image",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={oncloseUpdateImageModal}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12151A] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                <FiImage size={20} className="text-violet-400" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Update Welcome Image
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Replace your storefront welcome banner
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={oncloseUpdateImageModal}
              disabled={isUpdating}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
            {/* Left Side - Upload & Preview */}
            <div>
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={handleImageChange}
                className="hidden"
              />

              <p className="mb-3 text-xs font-medium tracking-wider text-gray-500">
                NEW WELCOME IMAGE
              </p>

              {!preview ? (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="group flex aspect-video w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#0D0F13] px-5 text-center transition hover:border-violet-400/50 hover:bg-violet-500/[0.03]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B1F26] transition group-hover:bg-violet-500/10">
                    <FiUploadCloud
                      size={26}
                      className="text-gray-400 transition group-hover:text-violet-400"
                    />
                  </div>

                  <p className="mt-5 text-sm font-medium text-gray-200">
                    Click to upload a new image
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    PNG, JPG, WEBP supported
                  </p>
                </button>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0F13]">
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-black">
                    <img
                      src={preview}
                      alt="Selected welcome image preview"
                      className="h-full w-full object-contain"
                    />

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/60 text-red-400 backdrop-blur-md transition hover:bg-red-500/20"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FiCheck className="text-emerald-400" size={15} />
                      <span className="text-xs text-gray-300">
                        Image ready
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="text-xs font-medium text-violet-400 transition hover:text-violet-300"
                    >
                      Change image
                    </button>
                  </div>
                </div>
              )}

              {/* Current Image */}
              {currentImage && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium tracking-wider text-gray-500">
                    CURRENT IMAGE
                  </p>

                  <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0D0F13] p-3">
                    <img
                      src={currentImage}
                      alt="Current welcome image"
                      className="h-14 w-24 rounded-lg object-cover"
                    />

                    <div>
                      <p className="text-xs font-medium text-gray-300">
                        Existing welcome banner
                      </p>
                      <p className="mt-1 text-[11px] text-gray-500">
                        Will be replaced if you upload a new image
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Status & Information */}
            <div className="flex flex-col">
              {/* Status */}
              <div>
                <p className="mb-3 text-xs font-medium tracking-wider text-gray-500">
                  IMAGE STATUS
                </p>

                <div className="rounded-xl border border-white/[0.06] bg-[#0D0F13] p-4">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-200">
                      Welcome Image Status
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Control whether the image appears on your storefront
                    </p>
                  </div>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#171A20] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
                  >
                    <option value="Active" className="bg-[#12151A] text-white">
                      Active
                    </option>

                    <option value="Inactive" className="bg-[#12151A] text-white">
                      Inactive
                    </option>
                  </select>

                  <div
                    className={`mt-3 flex items-center gap-2 text-xs ${
                      status === "Active"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        status === "Active"
                          ? "bg-emerald-400"
                          : "bg-red-400"
                      }`}
                    />

                    {status === "Active"
                      ? "This image will be visible on the storefront"
                      : "This image will be hidden from the storefront"}
                  </div>
                </div>
              </div>

              {/* Status Preview */}
              <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#0D0F13] p-4">
                <p className="text-xs font-medium tracking-wider text-gray-500">
                  STATUS PREVIEW
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      Storefront visibility
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Current selected status
                    </p>
                  </div>

                  <span
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                      status === "Active"
                        ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border border-red-500/20 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-5 flex-1 rounded-xl border border-violet-500/10 bg-violet-500/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                    <FiImage size={16} className="text-violet-400" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      Welcome Banner Settings
                    </p>

                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      Updating will save your new image and selected status.
                      Inactive welcome images will not be displayed to customers
                      on the ME storefront.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/[0.06] px-6 py-4">
            <p className="hidden text-xs text-gray-500 sm:block">
              Changes will apply after you update.
            </p>

            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                onClick={oncloseUpdateImageModal}
                disabled={isUpdating}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-gray-400 transition hover:bg-white/[0.04] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUpdating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FiUploadCloud size={15} />
                    Update Image
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

export default UpdateWelcomeImageModal;