import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UseMe } from "../../../../../context/Provider";
// import { UseMe } from "../../../../../context/Meprovider";

const PremiumShirts = () => {
  const navigate = useNavigate();

  const { getProductCategory } = UseMe();
  const [latestArrivalsShirts, setLatestArrivalsShirts] = useState([]);

  const getLatestArrivalsShirts = async () => {
    try {
      const latestArrivalsShirtApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getProductsByCategory/${getProductCategory}`,
      );

      setLatestArrivalsShirts(latestArrivalsShirtApi.data.products);

      console.log(
        "get Latest Arrivals shirts",
        latestArrivalsShirtApi.data.products,
      );
    } catch (error) {
      console.log("error in get latest Arrivals shirts", error.message);
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
  const handPickedShirts = latestArrivalsShirts.filter(
    (product) => product.isHandPicked === true,
  );

  useEffect(() => {
    if (getProductCategory) {
      getLatestArrivalsShirts();
    }
  }, [getProductCategory]);

  return (
    <section className="bg-black text-white min-h-screen overflow-hidden relative">
      <h1 className="absolute top-20 sm:top-24 left-0 text-[90px] sm:text-[180px] lg:text-[260px] font-bold text-white/[0.03] uppercase pointer-events-none select-none whitespace-nowrap">
        SHIRTS
      </h1>

      <button
        className="group flex items-center gap-3 absolute top-7 sm:top-10 left-4 sm:left-7 z-10"
        onClick={() => navigate(-1)}
      >
        <span className="text-xl transition-transform duration-300 group-hover:-translate-x-2">
          <IoArrowBack className="transition-transform duration-300 group-hover:-translate-x-1" />
        </span>
        <span className="uppercase tracking-[0.35em] text-xs sm:text-sm">
          Back
        </span>
      </button>

      <div className="pt-28 sm:pt-32">
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="uppercase tracking-[0.35em] sm:tracking-[0.45em] text-neutral-500 text-xs sm:text-sm">
            Latest Arrival
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl mt-5 sm:mt-6">
            Essential <span className="text-red-950">S</span>-hirts
          </h2>

          <p className="max-w-2xl mx-auto mt-5 sm:mt-8 text-sm sm:text-base text-neutral-400 leading-7 sm:leading-8">
            Discover timeless silhouettes crafted from premium fabrics. Designed
            for modern elegance and everyday luxury.
          </p>
        </motion.div>
      </div>

      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between border-y border-white/10 py-3 sm:py-5 px-4 sm:px-6 lg:px-10 mb-4 sm:mb-8">
          <p className="uppercase tracking-[0.2em] sm:tracking-[0.3em] text-neutral-400 text-[8px] sm:text-[11px]">
            Discover the collection
          </p>

          <p className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-neutral-500 text-[8px] sm:text-xs">
            {latestArrivalsShirts.length} Products
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {latestArrivalsShirts.map((items, index) => (
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
              className="cursor-pointer group"
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

              <div className="flex flex-col gap-3 p-2 sm:p-3">
                <div>
                  <p className="uppercase tracking-[0.04em] text-neutral-500 text-xs sm:text-sm">
                    {items.category}
                  </p>

                  <h3 className="font-serif tracking-wide text-sm sm:text-base mt-1">
                    {items.name}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <p className="text-sm font-semibold text-white">
                    ₹{items.price}
                  </p>

                  {items.discount > 0 && (
                    <p className="text-xs sm:text-sm text-green-500">
                      {items.discount}% OFF
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-neutral-500 line-through">
                    ₹{items.realPrice}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {handPickedShirts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
          <div>
            <p className="uppercase tracking-[0.35em] sm:tracking-[0.45em] text-neutral-500 text-xs sm:text-sm">
              trending now
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl mt-3">
              Handpicked For You
            </h2>
          </div>

          <div className="flex gap-3 sm:gap-6 overflow-x-auto pt-5 sm:pt-6 pb-6 snap-x snap-mandatory scrollbar-thin">
            {handPickedShirts.map((data, index) => (
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
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-center">
        <h2 className="font-serif text-2xl sm:text-4xl mt-3">
          Crafted for confidence. Designed by ME.
        </h2>
      </div>
    </section>
  );
};

export default PremiumShirts;
