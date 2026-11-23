import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { IoArrowBack } from "react-icons/io5";

const OfferPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const offerData = location.state?.offer;

  console.log("offerData", offerData);

  const products = Array.isArray(offerData?.products) ? offerData.products : [];

  const categories = [
    "All",
    "Shirts",
    "T-Shirts",
    "Pants",
    "Jackets",
    "InnerWear",
    "Shorts",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  const offerStartDate = offerData?.startDate
    ? new Date(offerData.startDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  const offerEndDate = offerData?.endDate
    ? new Date(offerData.endDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  const handleProductClick = (product) => {
    navigate("/productInfo", {
      state: { product },
    });
  };

  return (
    <section className="bg-black text-white min-h-screen overflow-hidden relative w-full">
      <h1 className="absolute top-20 sm:top-24 left-0 text-[70px] sm:text-[110px] md:text-[180px] lg:text-[260px] font-bold text-white/[0.03] uppercase pointer-events-none select-none whitespace-nowrap">
        Offers
      </h1>

      <button
        className="group flex items-center gap-2 sm:gap-3 absolute top-6 left-4 sm:top-10 sm:left-7 z-50"
        onClick={() => navigate(-1)}
      >
        <span className="text-lg sm:text-xl transition-transform duration-300 group-hover:-translate-x-2">
          <IoArrowBack className="transition-transform duration-300 group-hover:-translate-x-1" />
        </span>

        <span className="uppercase tracking-[0.2em] sm:tracking-[0.35em] text-xs sm:text-sm">
          Back
        </span>
      </button>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 relative z-10">
        <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.4em] text-gray-400">
          {offerStartDate} - {offerEndDate}
        </p>

        <h1 className="mt-5 sm:mt-6 text-5xl sm:text-7xl md:text-[100px] lg:text-[140px] font-black leading-[0.95] tracking-tighter break-words">
          {offerData?.discountType === "buy_x_get_y"
            ? `Buy ${offerData.buyQuantity} Get ${offerData.getQuantity}`
            : offerData?.discountType === "percentage"
              ? `${offerData.discountValue}%`
              : `₹${Number(offerData?.discountValue).toLocaleString("en-IN")}`}
        </h1>

        <h2 className="text-2xl sm:text-4xl md:text-6xl font-light mt-5 sm:mt-6 uppercase break-words">
          {offerData?.title}
        </h2>

        <p className="mt-5 sm:mt-8 max-w-xl text-gray-400 text-sm sm:text-base leading-7 sm:leading-8">
          {offerData?.description}
        </p>
      </section>

      <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-xl border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex gap-5 sm:gap-8 overflow-x-auto py-4 sm:py-5 no-scrollbar whitespace-nowrap">
            {categories.map((data) => (
              <button
                key={data}
                onClick={() => setSelectedCategory(data)}
                className="relative pb-2 shrink-0"
              >
                <p
                  className={`uppercase tracking-[2px] sm:tracking-[3px] text-xs sm:text-sm transition ${
                    selectedCategory === data
                      ? "text-white"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {data}
                </p>

                {selectedCategory === data && (
                  <motion.div
                    className="w-full h-[2px] left-0 bottom-0 bg-white absolute"
                    layoutId="smooth"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="w-full ">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mt-6 sm:mt-8 pb-20 sm:pb-24">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 sm:py-28 text-center">
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif text-neutral-700">
                Nothing to discover.
              </h3>

              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 tracking-wide px-3">
                No products are available in this category.
              </p>

              {selectedCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="mt-6 border-b border-white pb-1 text-xs uppercase tracking-[0.25em]"
                >
                  View All Products
                </button>
              )}
            </div>
          ) : (
            filteredProducts.map((product, index) => {
              const image =
                product.variants?.[0]?.color?.mainImage?.url ||
                product.variants?.[0]?.color?.subImages?.[0]?.url ||
                "";

              const brandIcon =
                product.brand?.brandIcon?.url ||
                product.brand?.brandIcon ||
                product.brand?.logo?.url ||
                product.brand?.logo ||
                "";

              const brandName =
                product.brand?.brandName || product.brand?.name || "ME";

              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 18,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                    transition: {
                      duration: 0.35,
                      ease: "easeOut",
                    },
                  }}
                  onClick={() => handleProductClick(product)}
                  className="group relative overflow-hidden cursor-pointer bg-[#111]"
                >
                  {/* Product Image */}
                  <div className="overflow-hidden">
                    <img
                      src={image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-[260px] sm:h-[350px] md:h-[420px] lg:h-[400px] xl:h-[430px] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent transition-all duration-700 group-hover:from-black group-hover:via-black/60" />

                  {/* Brand Icon */}
                  {brandIcon && (
                    <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full p-1.5 sm:p-2 flex items-center justify-center">
                      <img
                        src={brandIcon}
                        alt={brandName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 md:bottom-7 md:left-7 md:right-7 transition-all duration-500 group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
                    <p className="uppercase tracking-[0.15em] sm:tracking-[0.35em] text-[8px] sm:text-[10px] text-neutral-400">
                      {brandName} / {product.category}
                    </p>

                    <h3 className="font-serif text-base sm:text-xl md:text-2xl lg:text-[30px] mt-1.5 sm:mt-3 leading-tight text-white line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="mt-2 sm:mt-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm sm:text-base md:text-lg text-white">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>

                      <span className="flex items-center gap-1 sm:gap-2 uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[9px] sm:text-[11px] opacity-100 sm:opacity-0 translate-y-0 sm:translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-white">
                        View
                        <span className="text-base sm:text-lg">→</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default OfferPage;
