import axios from "axios";
import React from "react";
import { FiX, FiAlertTriangle, FiTrash2 } from "react-icons/fi";
import { UseMe } from "../../../../context/Meprovider";

const ProductDeleteModal = ({ oncloseDeleteModal }) => {
  const {
    productId,
    productDeleteBrand,
    productDeleteName,
  } = UseMe();

  const deleteProduct = async () => {
    try {
      const deleteProductApi = await axios.delete(
        `${import.meta.env.VITE_API_URL}/Me/deleteProduct/${productId}`,
      );

      console.log("delete product", deleteProductApi.data);

      oncloseDeleteModal();
    } catch (error) {
      console.log("error in delete product", error);
      console.log("Server response:", error.response?.data);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[#242932] bg-[#12151A] shadow-2xl">

        <div className="flex items-center justify-between border-b border-[#242932] px-6 py-5">
          <h2 className="text-lg font-semibold text-white">
            Delete Product
          </h2>

          <button
            onClick={oncloseDeleteModal}
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
              Are you sure you want to delete this product?
            </h3>

            <div className="mt-4 flex items-center justify-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-white">
                {productDeleteBrand?.brandIcon ? (
                  <img
                    src={productDeleteBrand.brandIcon}
                    alt={productDeleteBrand.brandName}
                    className="h-full w-full object-contain p-1"
                  />
                ) : (
                  <span className="text-sm font-semibold text-black">
                    {productDeleteBrand?.brandName
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </span>
                )}
              </div>

              <div className="text-left">
                <p className="text-sm font-semibold text-white">
                  {productDeleteName}
                </p>

                <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-gray-500">
                  {productDeleteBrand?.brandName || "No Brand"}
                </p>
              </div>

            </div>

            <p className="mt-5 text-sm leading-6 text-gray-500">
              This action will permanently delete the product and its
              Cloudinary images. This cannot be undone.
            </p>

          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#242932] px-6 py-4">

          <button
            onClick={oncloseDeleteModal}
            className="rounded-lg border border-[#2A2F38] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-[#1B1F26] hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={deleteProduct}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
          >
            <FiTrash2 size={16} />
            Delete Product
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDeleteModal;

