import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTag, FiRefreshCw } from "react-icons/fi";
import { LuTags } from "react-icons/lu";
import AddOffer from "./addoffer/AddOffer";

const GetOfferSales = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOfferModal, setShowOfferModal] = useState(false);
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
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#242932]">
                  {offers.map((offer) => (
                    <tr
                      key={offer._id}
                      className="transition hover:bg-[#181C23]"
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showOfferModal && (
          <AddOffer  oncloseOfferModal={() => setShowOfferModal(false)}/>
        )}
      </div>
    </div>
  );
};

export default GetOfferSales;
