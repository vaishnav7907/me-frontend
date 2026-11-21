import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiImage,
  FiUpload,
  FiRefreshCw,
  FiTrash2,
  FiMonitor,
  FiPlus,
  FiEye,
} from "react-icons/fi";
import { FiX, FiAlertTriangle } from "react-icons/fi";
import UpdateWelcomeImageModal from "./UpdateWelcomeImageModal";
import CreateWelcomeImageModal from "./CreateWelcomeImageModal";
import axios from "axios";

const GetwelcomeImage = () => {
  const [updateImageModal, setUpdateImageModal] = useState(false);
  const [createImageModal, setCreateImageModal] = useState(false);
  const [getImage, setGetImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [selectedwelcomeImg, setSelectedwelcomeImg] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deletewelcomeImageData, setDeletewelcomeImageData] = useState(null);
  const getimageFn = useCallback(async () => {
    try {
      const welcomeImage = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getWelcomeImage`,
      );

      setGetImage(welcomeImage.data.welcomepageImageData || []);
    } catch (error) {
      console.log("error in get welcome images frontend", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getimageFn();
  }, [getimageFn]);

  const handleDeleteImage = async (image) => {
    try {
      setDeleting(true);

      const token =
        localStorage.getItem("token") 

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/Me/deleteWelcomeImage/${deletewelcomeImageData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setGetImage((prev) => prev.filter((item) => item._id !== image._id));
        setDeleteModal(false);
      }
    } catch (error) {
      console.log("error in deleting welcome image", error);

      alert(error.response?.data?.message || "Failed to delete welcome image");
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdate = (image) => {
    setSelectedImage(image);
    setUpdateImageModal(true);
  };

  const handleCreateSuccess = () => {
    setCreateImageModal(false);
    getimageFn();
  };

  const handleUpdateSuccess = () => {
    setUpdateImageModal(false);
    getimageFn();
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.07] bg-[#171A20]">
              <FiImage size={22} className="text-violet-400" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Welcome Page
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your storefront welcome banner
              </p>
            </div>
          </div>

          <button
            onClick={() => setCreateImageModal(true)}
            className="flex items-center justify-center gap-2.5 self-start rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition hover:bg-violet-500 active:scale-[0.98] sm:self-auto"
          >
            <FiPlus size={18} />
            <FiImage size={16} />
            Create Image
          </button>
        </motion.div>

        {/* Page Status */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#12151A] px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
              <FiMonitor className="text-emerald-400" size={17} />
            </span>

            <div>
              <p className="text-sm font-medium text-gray-200">
                Storefront Welcome Banner
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                Manage the visual displayed on your ME welcome page
              </p>
            </div>
          </div>

          <span className="flex items-center gap-2 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] px-3 py-1.5 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Page Management
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-white/[0.06] bg-[#12151A]"
              >
                <div className="h-64 bg-white/[0.03]" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-1/2 rounded bg-white/[0.05]" />
                  <div className="h-3 w-1/3 rounded bg-white/[0.05]" />
                  <div className="h-10 rounded-xl bg-white/[0.05]" />
                </div>
              </div>
            ))}
          </div>
        ) : getImage.length > 0 ? (
          /* Image Cards */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {getImage.map((image, index) => (
              <motion.div
                key={image._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#12151A] shadow-xl shadow-black/10 transition hover:border-white/[0.12]"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-[#0D0F13] sm:h-72">
                  <img
                    src={image.welcomeImage?.url}
                    alt="ME Welcome Banner"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        image.status === "Active"
                          ? "bg-emerald-400"
                          : "bg-red-400"
                      }`}
                    />
                    <span className="text-[11px] font-medium text-white">
                      Welcome Banner
                    </span>
                  </div>

                  {/* Image Bottom Overlay */}
                  {/* <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-white/60">ME Storefront</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">
                        Welcome Page Image
                      </h3>
                    </div>

                    <button
                      onClick={() =>
                        window.open(image.welcomeImage?.url, "_blank")
                      }
                      title="Preview Image"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
                    >
                      <FiEye size={15} />
                    </button>
                  </div> */}
                </div>

                {/* Card Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-white">
                        Welcome Banner
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Storefront display image
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/[0.08]">
                      <FiImage size={17} className="text-violet-400" />
                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`mt-4 flex items-center gap-2 rounded-xl border border-white/[0.05] bg-[#0D0F13] px-3 py-2.5 ${
                      image.status === "Active"
                        ? "text-green-400"
                        : "text-red-500"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        image.status === "Active"
                          ? "bg-green-400"
                          : "bg-red-500"
                      }`}
                    />

                    <h1 className="text-sm font-medium">{image.status}</h1>
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        handleUpdate(image);
                        setSelectedwelcomeImg(image._id);
                      }}
                      className="flex items-center justify-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/[0.07] px-4 py-2.5 text-xs font-medium text-violet-300 transition hover:bg-violet-500/15"
                    >
                      <FiRefreshCw size={14} />
                      Replace
                    </button>

                    <button
                      onClick={() => {
                        setDeletewelcomeImageData(image);
                        setDeleteModal(true);
                      }}
                      disabled={deleting}
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.05] px-4 py-2.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                    >
                      <FiTrash2 size={14} />
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] bg-[#12151A] px-5 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-violet-500/15 bg-violet-500/[0.06]">
              <FiImage size={30} className="text-violet-400" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              No Welcome Image Yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Upload your first welcome banner to create a beautiful first
              impression for your ME storefront.
            </p>

            <button
              onClick={() => setCreateImageModal(true)}
              className="mt-6 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
            >
              <FiUpload size={16} />
              Upload Your First Image
            </button>
          </motion.div>
        )}

        {/* Storefront Info */}
        <div className="mt-6 rounded-2xl border border-violet-500/10 bg-gradient-to-br from-violet-500/[0.06] to-transparent p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/[0.08]">
              <FiMonitor size={18} className="text-violet-400" />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-200">
                Storefront Display
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Your welcome image is displayed on the ME storefront. Use
                high-quality images to maintain your brand's premium appearance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {createImageModal && (
          <CreateWelcomeImageModal
            oncloseCreateImageModal={() => setCreateImageModal(false)}
            onCreate={handleCreateSuccess}
          />
        )}
      </AnimatePresence>

      {/* Update Modal */}

      {deleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[#242932] bg-[#12151A] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#242932] px-6 py-5">
              <h2 className="text-lg font-semibold text-white">
                Delete Welcome Image
              </h2>

              <button
                onClick={() => setDeleteModal(false)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-[#1B1F26] hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="mb-5 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                  <FiAlertTriangle size={28} />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-base font-semibold text-white">
                  Are you sure you want to delete this welcome image?
                </h3>

                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-white">
                    {deletewelcomeImageData?.welcomeImage?.url ? (
                      <img
                        src={deletewelcomeImageData.welcomeImage.url}
                        alt="Welcome image"
                        className="h-full w-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-black">
                        Image not found
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-gray-500">
                  This action will permanently delete the welcome image and its
                  Cloudinary image. This cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#242932] px-6 py-4">
              <button
                onClick={() => setDeleteModal(false)}
                disabled={deleting}
                className="rounded-lg border border-[#2A2F38] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-[#1B1F26] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDeleteImage(deletewelcomeImageData)}
                disabled={deleting}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiTrash2 size={16} />
                {deleting ? "Deleting..." : "Delete Image"}
              </button>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {updateImageModal && selectedImage && (
          <UpdateWelcomeImageModal
            oncloseUpdateImageModal={() => setUpdateImageModal(false)}
            currentImage={selectedImage.welcomeImage?.url}
            currentStatus={selectedImage.status}
            onUpdate={handleUpdateSuccess}
            selectedid={selectedwelcomeImg}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GetwelcomeImage;
