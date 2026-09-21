import axios from "axios";
import React, { useState } from "react";
import { FiX, FiAlertTriangle, FiTrash2 } from "react-icons/fi";
import { UseMe } from "../../../../context/Meprovider";
const DeleteLatestArrivalsModal = ({ oncloseDeleteLatestArrivals }) => {
  const {
    latestArrivalsId,
    dltLatestArrivalsName,
    dltLatestArrivalsCategory,
    dltLatestArrivalsDescription,
    dltLatestArrivalsImage,
  } = UseMe();
  const [loading, setloading] = useState(false);
  const deleteLatestArrivals = async () => {
    try {
      const adminToken = localStorage.getItem("token");
      setloading(true);
      const deleteLatestArrivalsApi = await axios.delete(
        `${import.meta.env.VITE_API_URL}/Me/deleteLatestArrivals/${latestArrivalsId}`,
        { headers: { Authorization: `Bearer ${adminToken}` } },
      );
      if (deleteLatestArrivalsApi.status === 200) {
        alert("Latest arrival deleted successfully");
        oncloseDeleteLatestArrivals();
      }
    } catch (error) {
      console.log("Error in delete latest arrival:", error);
      console.log("Server response:", error.response?.data);
      alert(error.response?.data?.message || "Failed to delete latest arrival");
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[#242932] bg-[#12151A] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#242932] px-6 py-5">
          <h2 className="text-lg font-semibold text-white">
            Delete Latest Arrival
          </h2>
          <button
            onClick={oncloseDeleteLatestArrivals}
            disabled={loading}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-[#1B1F26] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
              Are you sure you want to delete this latest arrival?
            </h3>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-white">
                {dltLatestArrivalsImage ? (
                  <img
                    src={dltLatestArrivalsImage}
                    alt={dltLatestArrivalsName}
                    className="h-full w-full object-contain p-1"
                  />
                ) : (
                  <span className="text-sm font-semibold text-black">
                    {dltLatestArrivalsName?.charAt(0)?.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">
                  {dltLatestArrivalsName}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-gray-500">
                  {dltLatestArrivalsCategory || "No category"}
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-gray-500">
              This action will permanently delete the latest arrival and its
              Cloudinary image. This cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-[#242932] px-6 py-4">
          <button
            onClick={oncloseDeleteLatestArrivals}
            disabled={loading}
            className="rounded-lg border border-[#2A2F38] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-[#1B1F26] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={deleteLatestArrivals}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiTrash2 size={16} />
            {loading ? "Deleting..." : "Delete Latest Arrival"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteLatestArrivalsModal;
