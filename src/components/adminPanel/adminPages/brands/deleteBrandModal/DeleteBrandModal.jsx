import React from "react";
import { FiX, FiAlertTriangle, FiTrash2 } from "react-icons/fi";
import { UseMe } from "../../../../context/Meprovider";
import axios from "axios";
import Swal from "sweetalert2";
const DeleteBrandModal = () => {
  const { setBrandDeleteModal, brandId, brandDeleteName, brandDeleteIcon } =
    UseMe();
  const deleteBrands = async () => {
    try {
      const deleteBrandApi = await axios.delete(
        `${import.meta.env.VITE_API_URL}/Me/deleteBrand/${brandId}`,
      );
      console.log("brand delete", deleteBrandApi.data);
      setBrandDeleteModal(false);
      await Swal.fire({
        icon: "success",
        title: "Brand deleted",
        text: `${brandDeleteName} was deleted successfully.`,
        background: "#12151A",
        color: "#fff",
        confirmButtonColor: "#22c55e",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log("error in delete brand", error);
      console.log("Server response:", error.response?.data);
      const message =
        error.response?.data?.message ||
        "Something went wrong while deleting the brand.";
      await Swal.fire({
        icon: "warning",
        title: "Cannot delete brand",
        text: message,
        background: "#12151A",
        color: "#fff",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      {" "}
      <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-[#292e36] bg-[#101216] shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
        {" "}
        <div className="flex items-center justify-between px-5 py-4">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              {" "}
              <FiAlertTriangle size={18} />{" "}
            </div>{" "}
            <div>
              {" "}
              <h2 className="text-sm font-semibold text-white">
                {" "}
                Delete brand{" "}
              </h2>{" "}
              <p className="text-[11px] text-gray-500">
                {" "}
                Permanent action{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <button
            onClick={() => setBrandDeleteModal(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.06] hover:text-white"
          >
            {" "}
            <FiX size={18} />{" "}
          </button>{" "}
        </div>{" "}
        <div className="px-5 pb-5">
          {" "}
          <div className="rounded-xl border border-[#252a31] bg-[#15181d] p-3">
            {" "}
            <div className="flex items-center gap-3">
              {" "}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#30353d] bg-white">
                {" "}
                {brandDeleteIcon ? (
                  <img
                    src={brandDeleteIcon}
                    alt={brandDeleteName}
                    className="h-full w-full object-contain p-1.5"
                  />
                ) : (
                  <span className="text-lg font-semibold text-black">
                    {" "}
                    {brandDeleteName?.charAt(0)}{" "}
                  </span>
                )}{" "}
              </div>{" "}
              <div className="min-w-0">
                {" "}
                <p className="truncate text-sm font-semibold text-white">
                  {" "}
                  {brandDeleteName}{" "}
                </p>{" "}
                <p className="mt-0.5 text-[11px] text-gray-500"> Brand </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="mt-4 rounded-xl border border-red-500/10 bg-red-500/[0.045] px-3.5 py-3">
            {" "}
            <div className="flex gap-3">
              {" "}
              <FiAlertTriangle
                size={17}
                className="mt-0.5 shrink-0 text-red-400"
              />{" "}
              <div>
                {" "}
                <p className="text-xs font-medium text-red-300">
                  {" "}
                  This action cannot be undone{" "}
                </p>{" "}
                <p className="mt-1 text-[11px] leading-5 text-gray-500">
                  {" "}
                  The brand and its Cloudinary image will be permanently removed
                  if no products are using this brand.{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex items-center justify-end gap-2 border-t border-[#252a31] bg-[#0d0f12] px-5 py-4">
          {" "}
          <button
            onClick={() => setBrandDeleteModal(false)}
            className="rounded-lg border border-[#2b3038] px-4 py-2 text-xs font-medium text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            {" "}
            Cancel{" "}
          </button>{" "}
          <button
            onClick={deleteBrands}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-red-500/10 transition hover:bg-red-600 active:scale-[0.98]"
          >
            {" "}
            <FiTrash2 size={14} /> Delete brand{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default DeleteBrandModal;
