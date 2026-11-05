
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

  // Check whether an offer is currently active
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

  // Format discount based on discount type
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

  // Format applicable products
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
    <section className="bg-black text-white px-6 lg:px-20 py-28">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl"
      >
        <p className="uppercase tracking-[6px] text-gray-500 text-sm">
          Limited Time
        </p>

        <h2 className="text-5xl font-serif mt-4 leading-tight">
          Exclusive <br />
          <span className="text-zinc-500">Offers</span>
        </h2>

        <p className="text-gray-500 mt-6 text-lg">
          Explore limited-time promotions and exclusive savings on our premium
          fashion collections.
        </p>
      </motion.div>

      {/* Offers */}
      <div className="mt-20 border-t border-zinc-800">

        {loading ? (
          <div className="py-20 text-center text-zinc-500">
            Loading exclusive offers...
          </div>
        ) : activeOffers.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-serif text-white">
              No Offers Available
            </h3>
            <p className="text-zinc-500 mt-3">
              Stay tuned for our upcoming exclusive deals.
            </p>
          </div>
        ) : (
          activeOffers.map((data, index) => (
            <motion.div
              key={data._id}
              className="group flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-b border-zinc-800 py-10 cursor-pointer hover:border-zinc-600 transition-colors duration-300"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ x: 8 }}
              onClick={() => navigate("/Offers", { state: { offer: data } })}
            >
              <div className="flex-1">

                <p className="uppercase tracking-[4px] text-gray-500 text-sm">
                  {data.title}
                </p>

                <h2 className="text-3xl lg:text-5xl font-serif mt-3 group-hover:tracking-wide transition-all duration-500">
                  {getDiscountText(data)}
                </h2>

                <p className="text-gray-500 mt-5 max-w-xl leading-7">
                  {data.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-5 text-xs uppercase tracking-wider text-zinc-500">
                  <span>{getApplicableText(data)}</span>

                  <span className="h-1 w-1 rounded-full bg-zinc-600" />

                  <span>
                    Ends {new Date(data.endDate).toLocaleDateString("en-IN")}
                  </span>
                </div>

              </div>

              <button className="flex items-center gap-5"
              // onClick={()}
              >
                <span className="text-zinc-500 group-hover:text-white transition">
                  Shop Now
                </span>

                <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <GoArrowUpRight size={22} />
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
