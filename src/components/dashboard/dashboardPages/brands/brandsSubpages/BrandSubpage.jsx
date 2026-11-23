import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BrandSubpage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const brandData = location.state?.brandProducts;

  console.log("brand data", brandData);

  const brand = {
    name: "ZARA",
    slogan: "Timeless fashion for modern living.",
    description:
      "Founded in Spain, ZARA has become one of the world's leading fashion brands by combining modern design with premium craftsmanship.",
    founded: "1975",
    country: "Spain",
    stores: "2,000+",
    collections: "150+",
    banner:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
  };

  const [getBrandProducts, setGetBrandProducts] = useState([]);

  const brandProducts = async () => {
    try {
      const brandProductsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getProducts`,
      );

      console.log("get brand products", brandProductsApi.data.products);

      setGetBrandProducts(brandProductsApi.data.products);
    } catch (error) {
      console.log("error in get brandProducts", error);
    }
  };

  useEffect(() => {
    brandProducts();
  }, []);

  const categories = [
    "All",
    "Shirts",
    "T-Shirts",
    "Pants",
    "Jackets",
    "InnerWear",
    "Shorts",
  ];

  const exactBrandProducts = getBrandProducts.filter(
    (product) =>
      product?.brand?.brandName?.toLowerCase() ===
      brandData?.brandName?.toLowerCase(),
  );

  console.log("Exact Brand Products:", exactBrandProducts);

  const brandName = brandData?.brandName || "Brand Name";

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? exactBrandProducts
      : exactBrandProducts.filter((item) => item.category === selectedCategory);

  return (
    <section className="bg-black text-white min-h-screen overflow-hidden relative w-full">
      <h1 className="absolute top-24 left-0 text-[70px] sm:text-[110px] md:text-[170px] lg:text-[260px] font-bold text-white/[0.03] pointer-events-none select-none uppercase whitespace-nowrap">
        BRAND
      </h1>

      <button
        onClick={() => navigate(-1)}
        className="group absolute top-6 left-4 sm:top-10 sm:left-8 flex items-center gap-2 sm:gap-3 z-50"
      >
        <IoArrowBack className="text-lg sm:text-xl transition group-hover:-translate-x-2" />
        <span className="uppercase tracking-[0.2em] sm:tracking-[0.35em] text-xs sm:text-sm">
          Back
        </span>
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="uppercase tracking-[0.3em] sm:tracking-[0.45em] text-neutral-500 text-xs sm:text-sm">
            Premium Brand
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mt-4 sm:mt-5 break-words">
            {brandData?.brandName || "Brand Name"}
          </h2>

          <p className="max-w-2xl text-neutral-400 leading-7 sm:leading-8 text-sm sm:text-base mt-5 sm:mt-8">
            {brandData?.brandSlogan}
          </p>
        </motion.div>
      </div>

      <div className="pt-12 sm:pt-20">
        <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-xl border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
      </div>

      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 mt-8 sm:mt-14">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-14 sm:py-20 text-center">
              <h3 className="font-serif text-xl sm:text-2xl">
                No Products Found
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-neutral-500 px-2">
                {exactBrandProducts.length === 0
                  ? `No products are available for ${brandName}.`
                  : `No ${selectedCategory} products are available for ${brandName}.`}
              </p>

              {selectedCategory !== "All" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className="mt-6 border-b border-white pb-1 text-xs uppercase tracking-[0.25em]"
                >
                  View All Products
                </button>
              )}
            </div>
          ) : (
            filteredProducts.map((data, index) => (
              <motion.div
                key={data._id}
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
                  y: -10,
                  transition: {
                    duration: 0.35,
                    ease: "easeOut",
                  },
                }}
                className="group relative overflow-hidden cursor-pointer"
              >
                <div className="overflow-hidden">
                  <img
                    src={data.variants?.[0]?.color?.mainImage?.url}
                    alt={data.name}
                    loading="lazy"
                    className="w-full h-[260px] sm:h-[350px] md:h-[420px] lg:h-[400px] xl:h-[430px] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent transition-all duration-700 group-hover:from-black group-hover:via-black/50" />

                {brandData?.brandIcon?.url && (
                  <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10 w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-full p-1.5 sm:p-2 flex items-center justify-center">
                    <img
                      src={brandData.brandIcon.url}
                      alt={brandData.brandName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-7 sm:left-7 sm:right-7 transition-all duration-500 group-hover:-translate-y-2">
                  <p className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[9px] sm:text-[11px] text-neutral-300">
                    {data.category}
                  </p>

                  <h3 className="font-serif text-xl sm:text-2xl md:text-[30px] mt-2 sm:mt-3 leading-tight line-clamp-2">
                    {data.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 sm:mt-4">
                    <span className="text-white text-base sm:text-lg font-medium">
                      ₹{data.price}
                    </span>

                    <span className="text-neutral-400 text-xs sm:text-sm line-through decoration-red-500">
                      ₹{data.realPrice}
                    </span>

                    {data.discount > 0 && (
                      <span className="text-green-300 text-[10px] sm:text-xs tracking-[0.1em] uppercase">
                        {data.discount}% Off
                      </span>
                    )}

                    <button
                      type="button"
                      className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 duration-500 border-b border-white ml-auto text-xs sm:text-sm"
                      onClick={() =>
                        navigate("/productInfo", {
                          state: { product: data._id },
                        })
                      }
                    >
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <div className="mt-24 sm:mt-36 px-4 sm:px-6 lg:px-10 flex flex-col items-center gap-8 sm:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="uppercase tracking-[0.3em] sm:tracking-[0.45em] text-neutral-500 text-xs sm:text-sm">
            quality
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 sm:mt-5">
            Craftsmanship
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-7 sm:leading-8 mt-5 sm:mt-8 mx-auto">
            Every garment is designed with meticulous attention to detail. From
            premium fabrics to precise stitching, our commitment is to create
            timeless pieces that deliver comfort, durability, and elegance.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-32">
        <div>
          <p className="uppercase tracking-[0.3em] sm:tracking-[0.45em] text-neutral-500 text-xs sm:text-sm">
            trending now
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl mt-3">Best Sellers</h2>
        </div>

        <div className="scrollbar-thin flex snap-x snap-mandatory gap-4 sm:gap-6 overflow-x-auto pb-6 pt-6">
          {filteredProducts.map((data, index) => (
            <motion.div
              key={data._id || data.id}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() =>
                data._id &&
                navigate("/productInfo", {
                  state: { product: data },
                })
              }
              className="group min-w-[240px] w-[240px] sm:min-w-[280px] sm:w-[280px] md:min-w-[320px] md:w-[320px] cursor-pointer snap-center shrink-0"
            >
              <div className="relative overflow-hidden rounded-sm bg-neutral-950">
                <img
                  src={data.variants?.[0]?.color?.mainImage?.url}
                  alt={data.name || "Product"}
                  loading="lazy"
                  className="h-[340px] sm:h-[400px] md:h-[450px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                {brandData?.brandIcon?.url && (
                  <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10 w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-full p-1.5 sm:p-2 flex items-center justify-center">
                    <img
                      src={brandData.brandIcon.url}
                      alt={brandData.brandName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-7 sm:left-7 sm:right-7">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-300">
                    {data.category}
                  </p>

                  <h3 className="mt-2 font-serif text-xl sm:text-2xl line-clamp-2">
                    {data.name}
                  </h3>

                  <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className="text-base sm:text-lg font-medium text-white">
                      ₹{data.price}
                    </span>

                    <span className="text-xs sm:text-sm text-neutral-400 line-through decoration-red-500">
                      ₹{data.realPrice}
                    </span>

                    {data.discount > 0 && (
                      <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-green-300">
                        {data.discount}% Off
                      </span>
                    )}

                    <button
                      type="button"
                      className="ml-auto border-b border-white opacity-100 sm:opacity-0 duration-500 sm:group-hover:opacity-100 text-xs sm:text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/productInfo", {
                          state: { product: data },
                        });
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="pb-10 sm:pb-12 px-4 sm:px-6 flex flex-col items-center">
        <div className="text-center max-w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
            "Style isn't about trends.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            It's about timeless confidence."
          </h2>

          <p className="uppercase tracking-[0.25em] sm:tracking-[0.4em] text-neutral-500 mt-5 text-xs sm:text-sm">
            - {brand.name}
          </p>
        </div>

        <div className="h-[2px] w-32 sm:w-64 md:w-96 border-t border-b border-white/10 mt-8 sm:mt-10" />
      </section>
    </section>
  );
};

export default BrandSubpage;
