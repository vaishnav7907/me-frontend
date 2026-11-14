import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { FiTrash2, FiX, FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import axios from "axios";

import BrandList from "../brandlist/BrandList";
import BrandOverDisplay from "../brandOverDisplay/BrandOverDisplay";
import UpdateBrandOverDisplay from "../updateBrandOverDisplay/UpdateBrandOverDisplay";
import DeleteBrandModal from "../deleteBrandModal/DeleteBrandModal";
import { UseMe } from "../../../../context/Meprovider";

const StoreBrands = () => {
  const {
    updateBrandOpen,
    setUpdateBrandOpen,
    brandDeleteModal,
    setBrandDeleteModal,
  } = UseMe();

  const [addBrandBtn, setAddBrandBtn] = useState(false);
  const [brandBulkDeleteModal, setBrandBulkDeleteModal] = useState(false);

  const [getBrands, setGetBrands] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [deletingBrands, setDeletingBrands] = useState(false);

  // GET ALL BRANDS
  const getAllBrands = async () => {
    try {
      setRefreshing(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getBrand`,
      );

      setGetBrands(response.data.brand || []);
    } catch (error) {
      console.log("Error in get brands:", error);
      console.log("Server response:", error.response?.data);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  // DELETE SELECTED BRANDS
  const handleDeleteMultipleBrands = async () => {
    if (selectedBrandIds.length === 0) {
      alert("Please select at least one brand");
      return;
    }

    try {
      setDeletingBrands(true);

      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/Me/deleteMultipleBrands`,
        {
          data: {
            brandIds: selectedBrandIds,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setGetBrands((prev) =>
          prev.filter((brand) => !selectedBrandIds.includes(brand._id)),
        );

        setSelectedBrandIds([]);
        setBrandBulkDeleteModal(false);

        alert(response.data.message);
      }
    } catch (error) {
      console.log("Delete multiple brands error:", error);
      console.log("Server response:", error.response?.data);

      alert(
        error.response?.data?.message || "Failed to delete selected brands",
      );
    } finally {
      setDeletingBrands(false);
    }
  };

  // BRAND STATISTICS
  const totalBrands = getBrands.length;

  const activeBrands = getBrands.filter(
    (brand) => brand.status === "Active",
  ).length;

  const inactiveBrands = getBrands.filter(
    (brand) => brand.status !== "Active",
  ).length;

  const totalBrandProducts = getBrands.reduce(
    (total, brand) => total + (Number(brand.productCount) || 0),
    0,
  );

  return (
    <div className="min-h-screen">
      <div className="px-7 py-7">
        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h4 className="text-3xl font-semibold text-white">Brands</h4>

            <p className="max-w-2xl leading-8 text-neutral-400">
              Manage your fashion brands and their collections.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={getAllBrands}
              disabled={refreshing}
              className="flex h-10 items-center gap-2 rounded-xl border border-[#30353c] bg-[#15191d] px-4 text-xs font-semibold text-gray-400 transition-all hover:border-[#454c55] hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiRefreshCw
                size={15}
                className={refreshing ? "animate-spin" : ""}
              />

              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            <button
              type="button"
              onClick={() => setAddBrandBtn(true)}
              className="flex h-9 items-center gap-2 rounded-lg bg-white px-2.5 text-sm font-semibold text-black transition hover:bg-[#e8e8e8]"
            >
              <IoAdd size={20} />
              Add Brands
            </button>
          </div>
        </div>

        {/* BRAND OVERVIEW */}
        <div className="mt-7 grid grid-cols-1 gap-4 text-white sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Total Brands</p>
            <h2 className="mt-2 text-2xl font-semibold">{totalBrands}</h2>
          </div>

          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Active Brands</p>
            <h2 className="mt-2 text-2xl font-semibold">{activeBrands}</h2>
          </div>

          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Inactive Brands</p>
            <h2 className="mt-2 text-2xl font-semibold">{inactiveBrands}</h2>
          </div>

          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Brand Products</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {totalBrandProducts}
            </h2>
          </div>
        </div>

        {/* BULK DELETE ACTIONS */}
        <div className="flex items-center justify-end gap-3 pt-5">
          {selectedBrandIds.length > 0 && (
            <>
              <span className="text-xs text-gray-500">
                {selectedBrandIds.length} brands selected
              </span>

              <button
                type="button"
                onClick={() => setSelectedBrandIds([])}
                className="h-10 px-3 text-xs font-medium text-gray-400 transition hover:text-white"
              >
                Clear selection
              </button>

              <button
                type="button"
                onClick={() => setBrandBulkDeleteModal(true)}
                disabled={deletingBrands}
                className="flex h-10 items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 text-xs font-semibold text-red-400 transition-all hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiTrash2 size={15} />
                Delete ({selectedBrandIds.length})
              </button>
            </>
          )}
        </div>

        {/* BRAND LIST */}
        <div className="mt-7">
          <BrandList
            brands={getBrands}
            selectedBrandIds={selectedBrandIds}
            setSelectedBrandIds={setSelectedBrandIds}
          />
        </div>
      </div>

      {/* BULK DELETE CONFIRMATION MODAL */}
      {brandBulkDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111317] p-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setBrandBulkDeleteModal(false)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-white/[0.06] hover:text-white"
            >
              <FiX size={19} />
            </button>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
              <FiTrash2 size={24} className="text-red-400" />
            </div>

            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                Brand Management
              </p>

              <h2 className="mt-2 text-xl font-semibold text-white">
                Delete Brands
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Are you sure you want to delete these selected brands? This
                action cannot be undone.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-4">
              <div>
                <p className="text-xs text-neutral-500">Selected brands</p>

                <p className="mt-1 text-sm font-medium text-white">
                  Brands to delete
                </p>
              </div>

              <span className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-red-500/10 px-3 text-sm font-semibold text-red-400">
                {selectedBrandIds.length}
              </span>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-lg border border-yellow-500/10 bg-yellow-500/[0.04] p-3">
              <FiAlertTriangle
                className="mt-0.5 shrink-0 text-yellow-500"
                size={16}
              />

              <p className="text-xs leading-5 text-neutral-400">
                Permanently deleted brands cannot be recovered. Make sure you
                have selected the correct brands.
              </p>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => setBrandBulkDeleteModal(false)}
                disabled={deletingBrands}
                className="h-11 flex-1 rounded-lg border border-white/[0.09] bg-white/[0.03] text-sm font-medium text-neutral-400 transition hover:bg-white/[0.07] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteMultipleBrands}
                disabled={deletingBrands || selectedBrandIds.length === 0}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiTrash2 size={15} />
                {deletingBrands ? "Deleting..." : "Delete Brands"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD BRAND */}
      {addBrandBtn && (
        <BrandOverDisplay onclose={() => setAddBrandBtn(false)} />
      )}

      {/* UPDATE BRAND */}
      {updateBrandOpen && (
        <UpdateBrandOverDisplay
          oncloseUpdateBrand={() => setUpdateBrandOpen(false)}
        />
      )}

      {/* SINGLE BRAND DELETE */}
      {brandDeleteModal && (
        <DeleteBrandModal
          oncloseDeleteBrandModal={() => setBrandDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default StoreBrands;
