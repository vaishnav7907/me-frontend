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
    <section className="bg-black text-white min-h-screen overflow-hidden relative">
      {/* Background Text */}

      <h1 className="absolute top-24 left-0 text-[170px] lg:text-[260px] font-bold text-white/[0.03] pointer-events-none select-none uppercase">
        BRAND
      </h1>

      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="group absolute top-10 left-8 flex items-center gap-3 z-50"
      >
        <IoArrowBack className="text-xl transition group-hover:-translate-x-2" />
        <span className="uppercase tracking-[0.35em] text-sm">Back</span>
      </button>

      {/* Hero */}

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
            Premium Brand
          </p>

          <h2 className="text-5xl lg:text-7xl font-serif mt-5">
            {brandData?.brandName || "Brand Name"}
          </h2>

          <p className="max-w-2xl text-neutral-400 leading-8 mt-8">
            {brandData?.brandSlogan}
          </p>
        </motion.div>
      </div>

      {/* Categories */}

      <div className="pt-20">
        <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-xl border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-8 overflow-x-auto py-5 no-scrollbar">
              {categories.map((data) => (
                <button
                  key={data}
                  onClick={() => setSelectedCategory(data)}
                  className="relative pb-2"
                >
                  <p
                    className={`uppercase tracking-[3px] text-sm transition ${
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

      {/* Products */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <h3 className="font-serif text-2xl">No Products Found</h3>

            <p className="mt-3 text-sm text-neutral-500">
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
              {/* Image */}

              <div className="overflow-hidden rounded-sm">
                <img
                  src={data.variants?.[0]?.color?.mainImage?.url}
                  alt={data.name}
                  className="w-full h-[430px] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent transition-all duration-700 group-hover:from-black group-hover:via-black/50" />

              {/* Badge */}

              <span className="absolute top-6 left-6 bg-white text-black px-4 py-2 uppercase tracking-[0.35em] text-[10px]">
                New
              </span>

              {/* Content */}

              <div className="absolute bottom-7 left-7 right-7 transition-all duration-500 group-hover:-translate-y-2">
                <p className="uppercase tracking-[0.35em] text-[11px] text-neutral-300">
                  {data.category}
                </p>

                <h3 className="font-serif text-[30px] mt-3 leading-tight">
                  {data.name}
                </h3>

                <div className="flex items-center gap-4 mt-4">
                  <span className="text-white text-lg font-medium">
                    ₹{data.price}
                  </span>

                  <span className="text-neutral-400 text-sm line-through decoration-red-500">
                    ₹{data.realPrice}
                  </span>

                  {data.discount > 0 && (
                    <span className="text-green-300 text-xs tracking-[0.15em] uppercase">
                      {data.discount}% Off
                    </span>
                  )}

                  <button
                    className="opacity-0 group-hover:opacity-100 duration-500 border-b border-white ml-auto"
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

      {/* Craftsmanship */}

      <div className="mt-36 px-6 lg:px-10 flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
            quality
          </p>

          <h2 className="text-5xl font-serif mt-5">Craftsmanship</h2>

          <p className="text-neutral-400 max-w-3xl leading-8 mt-8 mx-auto">
            Every garment is designed with meticulous attention to detail. From
            premium fabrics to precise stitching, our commitment is to create
            timeless pieces that deliver comfort, durability, and elegance.
          </p>
        </motion.div>
      </div>

      {/* Best Sellers */}

      <div className="max-w-7xl mx-auto px-6 py-32">
        <div>
          <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
            trending now
          </p>

          <h2 className="font-serif text-4xl mt-3">Best Sellers</h2>
        </div>

        <div className="scrollbar-thin flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-6">
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
              className="group min-w-[280px] cursor-pointer snap-center sm:min-w-[320px]"
            >
              <div className="relative overflow-hidden rounded-sm bg-neutral-950">
                <img
                  src={data.variants?.[0]?.color?.mainImage?.url}
                  alt={data.name || "Product"}
                  loading="lazy"
                  className="h-[450px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-7 left-7 right-7">
                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-300">
                    {data.category}
                  </p>

                  <h3 className="mt-2 font-serif text-2xl">{data.name}</h3>

                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-lg font-medium text-white">
                      ₹{data.price}
                    </span>

                    <span className="text-sm text-neutral-400 line-through decoration-red-500">
                      ₹{data.realPrice}
                    </span>

                    {data.discount > 0 && (
                      <span className="text-xs uppercase tracking-[0.15em] text-green-300">
                        {data.discount}% Off
                      </span>
                    )}

                    <button
                      type="button"
                      className="ml-auto border-b border-white opacity-0 duration-500 group-hover:opacity-100"
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

      {/* Closing Quote */}

      <section className="pb-12 flex flex-col items-center">
        <div className="text-center">
          <h2 className="text-5xl lg:text-6xl font-serif leading-tight">
            "Style isn't about trends.
            <br />
            It's about timeless confidence."
          </h2>

          <p className="uppercase tracking-[0.4em] text-neutral-500 mt-5">
            - {brand.name}
          </p>
        </div>

        <div className="h-[2px] w-96 border-t border-b border-white/10 mt-10" />
      </section>
    </section>
  );
};

export default BrandSubpage;
