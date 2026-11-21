
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sales = () => {
  const navigate = useNavigate();

  const [getOffersState, setGetOffersState] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOffers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getOffers`
      );

      setGetOffersState(response.data.getOfferData || []);
    } catch (error) {
      console.error(
        "Error fetching offers:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  const activeOffers = getOffersState.filter((offer) => {
    const now = new Date();
    const startDate = new Date(offer.startDate);
    const endDate = new Date(offer.endDate);

    return (
      offer.status === "Active" &&
      now >= startDate &&
      now <= endDate
    );
  });

  const getDiscountText = (offer) => {
    if (offer.discountType === "percentage") {
      return `${offer.discountValue}% OFF`;
    }

    if (offer.discountType === "fixed") {
      return `₹${Number(offer.discountValue).toLocaleString("en-IN")} OFF`;
    }

    if (offer.discountType === "buy_x_get_y") {
      return `BUY ${offer.buyQuantity} GET ${offer.getQuantity}`;
    }

    return "SPECIAL OFFER";
  };

  const getApplicableText = (offer) => {
    if (offer.applicableTo === "All") {
      return "All Products";
    }

    if (offer.applicableTo === "Category") {
      return offer.category;
    }

    if (offer.applicableTo === "Products") {
      return `${offer.products?.length || 0} Selected Products`;
    }

    return "";
  };

  return (
    <section className="min-h-screen bg-black text-white px-4 py-24 sm:px-6 sm:py-28 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl"
      >
        <p className="text-xs uppercase tracking-[4px] text-gray-500 sm:text-sm sm:tracking-[6px]">
          Limited Time
        </p>

        <h2 className="mt-3 font-serif text-4xl leading-tight sm:mt-4 sm:text-5xl lg:text-6xl">
          Exclusive <br />
          <span className="text-zinc-500">Offers</span>
        </h2>

        <p className="mt-5 max-w-xl text-sm leading-6 text-gray-500 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
          Explore limited-time promotions and exclusive savings on our premium
          fashion collections.
        </p>
      </motion.div>

      <div className="mt-12 border-t border-zinc-800 sm:mt-16 lg:mt-20">
        {loading ? (
          <div className="py-16 text-center text-sm text-zinc-500 sm:py-20">
            Loading exclusive offers...
          </div>
        ) : activeOffers.length === 0 ? (
          <div className="py-16 text-center sm:py-20">
            <h3 className="font-serif text-xl text-white sm:text-2xl">
              No Offers Available
            </h3>
            <p className="mt-3 text-sm text-zinc-500">
              Stay tuned for our upcoming exclusive deals.
            </p>
          </div>
        ) : (
          activeOffers.map((data, index) => (
            <motion.div
              key={data._id}
              className="group flex cursor-pointer flex-col items-start justify-between gap-6 border-b border-zinc-800 py-7 transition-colors duration-300 hover:border-zinc-600 sm:gap-8 sm:py-9 lg:flex-row lg:items-center lg:py-10"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ x: 8 }}
              onClick={() => navigate("/Offers", { state: { offer: data } })}
            >
              <div className="min-w-0 flex-1">
                <p className="break-words text-[10px] uppercase tracking-[3px] text-gray-500 sm:text-sm sm:tracking-[4px]">
                  {data.title}
                </p>

                <h2 className="mt-3 break-words font-serif text-2xl leading-tight transition-all duration-500 sm:text-3xl lg:text-5xl group-hover:tracking-wide">
                  {getDiscountText(data)}
                </h2>

                <p className="mt-4 max-w-xl break-words text-sm leading-6 text-gray-500 sm:mt-5 sm:leading-7">
                  {data.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[1.5px] text-zinc-500 sm:mt-5 sm:gap-4 sm:text-xs sm:tracking-wider">
                  <span className="break-words">{getApplicableText(data)}</span>

                  <span className="hidden h-1 w-1 shrink-0 rounded-full bg-zinc-600 sm:block" />

                  <span>
                    Ends {new Date(data.endDate).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                className="flex w-full shrink-0 items-center justify-between gap-4 border border-zinc-800 px-4 py-3 transition sm:w-auto sm:border-0 sm:px-0 sm:py-0 sm:gap-5"
              >
                <span className="text-xs uppercase tracking-[2px] text-zinc-500 transition group-hover:text-white sm:text-sm">
                  Shop Now
                </span>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-700 transition-all duration-300 group-hover:bg-white group-hover:text-black sm:h-12 sm:w-12">
                  <GoArrowUpRight size={20} />
                </div>
              </button>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default Sales;
