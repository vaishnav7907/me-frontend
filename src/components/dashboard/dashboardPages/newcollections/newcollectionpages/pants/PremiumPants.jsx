import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
// import { UseMe } from "../../../../../context/Meprovider";
import axios from "axios";
import { UseMe } from "../../../../../context/Provider";

const PremiumPants = () => {
  const navigate = useNavigate();
  const { getProductCategory } = UseMe();

  const [latestArrivalsPants, setLatestArrivalsPants] = useState([]);

  const getLatestArrivalsPants = async () => {
    try {
      const latestArrivalsPantsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getProductsByCategory/${getProductCategory}`,
      );

      setLatestArrivalsPants(latestArrivalsPantsApi.data.products);

      console.log(
        "get Latest Arrivals pants",
        latestArrivalsPantsApi.data.products,
      );
    } catch (error) {
      console.log("error in get latest Arrivals pants", error.message);
    }
  };

   const BrandIcon = ({ brand }) => {
    const brandLogo = brand?.brandIcon?.url;

    return (
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden p-1.5">
        {brandLogo ? (
          <img
            src={brandLogo}
            alt={brand?.name || brand?.brandName || "Brand"}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-black font-serif font-semibold text-xs sm:text-sm tracking-wider">
            {getBrandInitials(brand)}
          </span>
        )}
      </div>
    );
  };
  const handPickedPants = latestArrivalsPants.filter(
    (product) => product.isHandPicked === true,
  );

  useEffect(() => {
    if (getProductCategory) {
      getLatestArrivalsPants();
    }
  }, [getProductCategory]);

  return (
    <section className="bg-black text-white min-h-screen overflow-hidden pb-16 sm:pb-20">
      <div className="relative">
        <h1 className="absolute top-20 sm:top-24 md:top-20 lg:top-16 left-0 text-[75px] sm:text-[120px] md:text-[180px] lg:text-[260px] font-bold text-white/[0.03] uppercase pointer-events-none select-none leading-none whitespace-nowrap">
          PANTS
        </h1>

        <button
          className="group flex items-center gap-2 sm:gap-3 absolute top-6 left-4 sm:top-10 sm:left-7 z-20"
          onClick={() => navigate(-1)}
        >
          <span className="text-base sm:text-xl transition-transform duration-300 group-hover:-translate-x-2">
            <IoArrowBack className="transition-transform duration-300 group-hover:-translate-x-1" />
          </span>
          <span className="uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[9px] sm:text-sm">
            Back
          </span>
        </button>

        <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-7 lg:px-10 pt-24 sm:pt-32 lg:pt-36">
          <motion.div
            className="text-center pb-10 sm:pb-14 lg:pb-20 px-1"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[0.3em] sm:tracking-[0.45em] text-neutral-500 text-[9px] sm:text-sm">
              Latest Arrival
            </p>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-3 tracking-wide">
              Premium Pants
            </h2>

            <p className="max-w-2xl mx-auto mt-4 sm:mt-6 text-neutral-400 text-xs sm:text-sm leading-6 sm:leading-7 px-2">
              Discover timeless silhouettes crafted from premium fabrics.
              Designed for modern elegance and everyday luxury.
            </p>

            <div className="flex justify-center items-center gap-2 sm:gap-3 mt-5 sm:mt-7">
              <span className="w-7 sm:w-12 h-[1px] bg-neutral-700" />
              <span className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-neutral-500 text-[8px] sm:text-[10px]">
                Modern Essentials
              </span>
              <span className="w-7 sm:w-12 h-[1px] bg-neutral-700" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between border-y border-white/10 py-3 sm:py-5 px-4 sm:px-6 lg:px-10 mb-4 sm:mb-8">
          <p className="uppercase tracking-[0.2em] sm:tracking-[0.3em] text-neutral-400 text-[8px] sm:text-[11px]">
            Discover the collection
          </p>

          <p className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-neutral-500 text-[8px] sm:text-xs">
            {latestArrivalsPants.length} Products
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {latestArrivalsPants.map((items, index) => (
            <motion.div
              key={items._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() =>
                navigate("/productInfo", {
                  state: { product: items },
                })
              }
              className="cursor-pointer group min-w-0"
            >
              <div className="aspect-[3/4] overflow-hidden relative bg-neutral-900">
                <img
                  src={items.variants?.[0]?.color?.mainImage?.url}
                  alt={items.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent pointer-events-none" />

                <BrandIcon brand={items.brand} />
              </div>

              <div className="flex flex-col gap-2 sm:gap-3 p-1.5 sm:p-3">
                <div>
                  <p className="uppercase tracking-[0.04em] text-neutral-500 text-[9px] sm:text-sm">
                    {items.category}
                  </p>

                  <h3 className="font-serif tracking-wide text-xs sm:text-base mt-1 line-clamp-2 leading-snug">
                    {items.name}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3">
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    ₹{items.price}
                  </p>

                  {items.discount > 0 && (
                    <p className="text-[9px] sm:text-sm text-green-500">
                      {items.discount}% OFF
                    </p>
                  )}

                  {items.realPrice > items.price && (
                    <p className="text-[9px] sm:text-sm text-neutral-500 line-through">
                      ₹{items.realPrice}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {latestArrivalsPants.length === 0 && (
          <div className="py-16 sm:py-20 text-center px-4">
            <p className="uppercase tracking-[0.2em] sm:tracking-[0.3em] text-neutral-500 text-[10px] sm:text-xs">
              No pants available
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm mt-3">
              New styles will be arriving soon.
            </p>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center py-16 sm:py-24 lg:py-36 px-3 sm:px-5"
      >
        <p className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[8px] sm:text-[11px] text-neutral-500">
          ME / Design Philosophy
        </p>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto mt-4 leading-tight">
          Crafted for movement.
          <span className="text-neutral-500"> Designed for timeless style.</span>
        </h2>

        <p className="max-w-lg mx-auto text-neutral-400 text-[11px] sm:text-sm leading-5 sm:leading-7 mt-4 sm:mt-5 px-2">
          From everyday essentials to refined silhouettes, discover
          trousers that bring comfort, confidence, and sophistication
          to every look.
        </p>

        <div className="mt-6 sm:mt-8 flex justify-center">
          <span className="w-10 h-[1px] bg-white/40" />
        </div>
      </motion.div>

      {handPickedPants.length > 0 && (
        <div className="max-w-[1600px] mx-auto px-3 sm:px-5 md:px-7 lg:px-10 pb-16 sm:pb-24 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 border-b border-white/10 pb-5 sm:pb-8"
          >
            <div>
              <p className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[8px] sm:text-[11px] text-neutral-500">
                Trending / Exclusive Selection
              </p>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3">
                Handpicked For You
              </h2>
            </div>

            <p className="text-[8px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-neutral-500">
              Curated by ME
            </p>
          </motion.div>

          <div className="flex gap-3 sm:gap-6 overflow-x-auto pt-5 sm:pt-6 pb-6 snap-x snap-mandatory scrollbar-thin">
            {handPickedPants.map((data, index) => (
              <motion.div
                key={data._id || data.id}
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                onClick={() =>
                navigate("/productInfo", {
                  state: { product: data },
                })
              }
                className="flex-none w-[75vw] sm:w-[320px] md:w-[350px] snap-start group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-sm">
                  <div className="aspect-[3/4] overflow-hidden bg-neutral-900">
                    <img
                      src={data.variants?.[0]?.color?.mainImage?.url}
                      alt={data.name}
                      className="w-full h-full object-cover duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  <BrandIcon brand={data.brand} />
                </div>

                <div className="flex flex-col gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <div>
                    <p className="uppercase tracking-[0.04em] text-neutral-500 text-[10px] sm:text-xs">
                      {data.category}
                    </p>

                    <h3 className="font-serif tracking-wide text-sm sm:text-base mt-1 line-clamp-2">
                      {data.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      ₹{data.price}
                    </p>

                    {data.discount > 0 && (
                      <p className="text-[10px] sm:text-sm text-green-500">
                        {data.discount}% OFF
                      </p>
                    )}

                    <p className="text-[10px] sm:text-sm text-neutral-500 line-through">
                      ₹{data.realPrice}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-[7px] sm:text-[10px] text-neutral-600 uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-2 sm:mt-3">
            Scroll to discover more →
          </p>
        </div>
      )}

      <footer className="border-t border-white/10 py-7 sm:py-10">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <h3 className="uppercase text-2xl sm:text-3xl font-serif tracking-[0.25em] sm:tracking-[0.3em]">
            ME
          </h3>

          <p className="text-[7px] sm:text-[10px] text-neutral-600 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-center">
            Create Your Own Trend
          </p>

          <div className="flex items-center gap-3">
            <span className="w-5 h-[1px] bg-neutral-700" />
            <span className="text-[7px] sm:text-[8px] text-neutral-600 tracking-[0.15em] sm:tracking-[0.2em]">
              EST. 2002
            </span>
            <span className="w-5 h-[1px] bg-neutral-700" />
          </div>
        </div>
      </footer>
    </section>
  );
};

export default PremiumPants;