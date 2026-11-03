import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTag, FiRefreshCw } from "react-icons/fi";
import { FiX, FiTrash2 } from "react-icons/fi";
import { LuTags } from "react-icons/lu";
import AddOffer from "./addoffer/AddOffer";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UpdateOffer from "./updateOffer/UpdateOffer";
import { UseMe } from "../../../context/Meprovider";

const GetOfferSales = () => {
  const { offerId, setOfferId } = UseMe();
  const context = UseMe();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showUpdateOfferModal, setShowUpdateOfferModal] = useState(false);
  const [showDltOfferModal, setShowDltOfferModal] = useState(false);
  const [selectedDltOffer, setSelectedDltOffer] = useState(null);
  const [dltOfferId, setDltOfferId] = useState(null);
  const openUpdateModal = (id) => {
    setOfferId(id);

    setShowUpdateOfferModal(true);
  };
  console.log("offer id", offerId);

  const getOffers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getOffers`,
      );

      setOffers(response.data.getOfferData || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  const deleteOfferFn = async () => {
    try {
      setLoading(true);
      const adminToken = localStorage.getItem("token");
      const dltOfferApi = await axios.delete(
        `${import.meta.env.VITE_API_URL}/Me/removeOffer/${dltOfferId}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        },
      );
      alert("Offer Deleted Successfully ");
      setShowDltOfferModal(false);
      setDltOfferId(null);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete offer");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0B0D10] p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Offers & Sales</h1>
            <p className="mt-2 text-sm text-gray-400">
              Manage your store promotions and discounts.
            </p>
          </div>

          <div className="flex justify-between gap-3">
            <button
              onClick={() => setShowOfferModal(true)}
              className="flex items-center gap-2 rounded-lg bg-[#8B5CF6] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#7C3AED]"
            >
              <LuTags size={18} />
              Add Offer
            </button>

            <button
              onClick={getOffers}
              className="flex items-center gap-2 rounded-lg border border-[#242932] px-4 py-2 text-sm transition hover:bg-[#181C23]"
            >
              <FiRefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#242932] bg-[#12151A] p-5">
            <p className="text-sm text-gray-400">Total Offers</p>
            <h2 className="mt-2 text-2xl font-semibold">{offers.length}</h2>
          </div>

          <div className="rounded-xl border border-[#242932] bg-[#12151A] p-5">
            <p className="text-sm text-gray-400">Active Offers</p>
            <h2 className="mt-2 text-2xl font-semibold text-green-400">
              {offers.filter((offer) => offer.status === "Active").length}
            </h2>
          </div>

          <div className="rounded-xl border border-[#242932] bg-[#12151A] p-5">
            <p className="text-sm text-gray-400">Inactive Offers</p>
            <h2 className="mt-2 text-2xl font-semibold text-gray-400">
              {offers.filter((offer) => offer.status === "Inactive").length}
            </h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#242932] bg-[#12151A]">
          <div className="border-b border-[#242932] p-5">
            <h2 className="font-semibold">All Offers</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-400">
              Loading offers...
            </div>
          ) : offers.length === 0 ? (
            <div className="p-12 text-center">
              <FiTag className="mx-auto mb-3 text-3xl text-gray-500" />
              <p className="text-gray-300">No offers found</p>
              <p className="mt-1 text-sm text-gray-500">
                Create your first offer to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-[#181C23] text-xs uppercase text-gray-400">
                  <tr>
                    <th className="px-5 py-4">Offer</th>
                    <th className="px-5 py-4">Discount</th>
                    <th className="px-5 py-4">Applicable To</th>
                    <th className="px-5 py-4">Start Date</th>
                    <th className="px-5 py-4">End Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Update</th>
                    <th className="px-5 py-4">Delete</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#242932]">
                  {offers.map((offer) => (
                    <tr
                      key={offer._id}
                      className="transition hover:bg-[#111316]"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium">{offer.title}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {offer.description}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm">
                        {offer.discountType === "percentage"
                          ? `${offer.discountValue}%`
                          : offer.discountType === "fixed"
                            ? `₹${offer.discountValue}`
                            : `Buy ${offer.buyQuantity} Get ${offer.getQuantity}`}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-300">
                        {offer.applicableTo === "Category"
                          ? offer.category
                          : "All Products"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-400">
                        {new Date(offer.startDate).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-400">
                        {new Date(offer.endDate).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            offer.status === "Active"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-gray-500/10 text-gray-400"
                          }`}
                        >
                          {offer.status}
                        </span>
                      </td>

                      <td className="px-9 py-4">
                        <button
                          type="button"
                          title="Edit Offer"
                          onClick={() => openUpdateModal(offer._id)}
                          className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 transition-all duration-200 hover:border-violet-500/50 hover:bg-violet-500 hover:text-white hover:shadow-lg hover:shadow-violet-500/20 active:scale-95"
                        >
                          <FaRegEdit
                            size={18}
                            className="transition-transform duration-200 group-hover:scale-110"
                          />
                        </button>
                      </td>

                      <td className="px-9 py-4">
                        <button
                          type="button"
                          title="Delete Offer"
                          onClick={() => {
                            setShowDltOfferModal(true);
                            setSelectedDltOffer(offer);
                            setDltOfferId(offer._id);
                          }}
                          className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 transition-all duration-200 hover:border-red-500/50 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/20 active:scale-95"
                        >
                          <MdDelete
                            size={20}
                            className="transition-transform duration-200 group-hover:scale-110"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showOfferModal && (
          <AddOffer oncloseOfferModal={() => setShowOfferModal(false)} />
        )}

        {showUpdateOfferModal && (
          <UpdateOffer
            oncloseUpdateOfferModal={() => setShowUpdateOfferModal(false)}
          />
        )}

        {showDltOfferModal && selectedDltOffer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl border border-[#303641] bg-[#12151A] p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Confirm Delete Offer
                </h2>

                <button
                  type="button"
                  onClick={() => setShowDltOfferModal(false)}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-[#242932] hover:text-white"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="mb-5 rounded-xl border border-[#303641] bg-[#0B0D10] p-4">
                <div className="mb-4 flex items-start gap-3">
                  <div className="rounded-lg bg-purple-500/10 p-3">
                    <FiTag className="text-xl text-purple-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white">
                      {selectedDltOffer.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {selectedDltOffer.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-[#303641] pt-4">
                  <div>
                    <p className="text-xs text-gray-500">Discount</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {selectedDltOffer.discountType === "percentage"
                        ? `${selectedDltOffer.discountValue}% OFF`
                        : selectedDltOffer.discountType === "fixed"
                          ? `₹${selectedDltOffer.discountValue} OFF`
                          : `Buy ${selectedDltOffer.buyQuantity} Get ${selectedDltOffer.getQuantity}`}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Applicable To</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {selectedDltOffer.applicableTo === "Category"
                        ? selectedDltOffer.category
                        : selectedDltOffer.applicableTo === "Products"
                          ? `${selectedDltOffer.products?.length || 0} Selected Products`
                          : "All Products"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="mt-1 text-sm text-white">
                      {new Date(
                        selectedDltOffer.startDate,
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">End Date</p>
                    <p className="mt-1 text-sm text-white">
                      {new Date(selectedDltOffer.endDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-1 text-xs ${
                        selectedDltOffer.status === "Active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-gray-500/10 text-gray-400"
                      }`}
                    >
                      {selectedDltOffer.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-500/10 p-3">
                <FiTrash2 className="shrink-0 text-xl text-red-400" />
                <p className="text-sm text-red-300">
                  Are you sure you want to permanently delete this offer? This
                  action cannot be undone.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDltOfferModal(false)}
                  className="rounded-lg border border-[#303641] px-5 py-2.5 text-sm text-gray-300 transition hover:bg-[#242932]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={deleteOfferFn}
                  disabled={loading}
                  className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Delete Offer"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetOfferSales;
