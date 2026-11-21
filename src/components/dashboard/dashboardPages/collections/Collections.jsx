import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { RiArrowRightLongFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MenCollection = () => {
  const categories = [
    "All",
    "Shirts",
    "T-Shirts",
    "Pants",
    "Jackets",
    "InnerWear",
    "Shorts",
  ];

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [getAllProducts, setGetAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const getallproductsByCategoryfn = async () => {
    try {
      const getAllProductsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getProducts`,
      );
      setGetAllProducts(getAllProductsApi.data.products || []);
      console.log("get all products", getAllProductsApi.data.products);
    } catch (error) {
      console.log("error in get products", error);
      console.log("Server response:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getallproductsByCategoryfn();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? getAllProducts
      : getAllProducts.filter(
          (item) =>
            item.category?.toLowerCase() ===
            selectedCategory.toLocaleLowerCase(),
        );

  return (
    <div className="min-h-screen bg-black text-white pb-14">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.p
          initial={isMobile ? false : { opacity: 0 }}
          animate={isMobile ? undefined : { opacity: 1 }}
          className="uppercase tracking-[5px] sm:tracking-[8px] text-[10px] sm:text-sm text-gray-500"
        >
          Premium Fashion
        </motion.p>

        <motion.h1
          initial={isMobile ? false : { opacity: 0, y: 40 }}
          animate={isMobile ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-8xl font-extralight mt-5 sm:mt-6"
        >
          Men's Collection
        </motion.h1>

        <motion.p
          initial={isMobile ? false : { opacity: 0 }}
          animate={isMobile ? undefined : { opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mt-5 sm:mt-8 text-xs sm:text-base text-gray-500 leading-6 sm:leading-8"
        >
          Discover timeless menswear crafted with premium fabrics, modern
          tailoring and effortless elegance.
        </motion.p>
      </section>

      <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-xl border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-5 sm:gap-8 overflow-x-auto py-4 sm:py-5 no-scrollbar">
            {categories.map((data) => (
              <button
                key={data}
                onClick={() => setSelectedCategory(data)}
                className="relative pb-2 shrink-0"
              >
                <p
                  className={`uppercase tracking-[2px] sm:tracking-[3px] text-[10px] sm:text-sm transition ${
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

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <p className="text-gray-500 uppercase tracking-[4px] text-sm">
            Loading...
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex justify-center items-center py-32">
          <p className="text-gray-500 uppercase tracking-[4px] text-sm">
            No products found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-8 sm:mt-14">
          {filteredProducts.map((data, index) => {
            const image = data.variants?.[0]?.color?.mainImage?.url || "";

            return (
              <motion.div
                key={data._id}
                initial={isMobile ? false : { opacity: 0, y: 50 }}
                whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 18,
                  delay: isMobile ? 0 : index * 0.08,
                }}
                whileHover={
                  isMobile
                    ? undefined
                    : {
                        y: -10,
                        transition: { duration: 0.35, ease: "easeOut" },
                      }
                }
                className="group relative overflow-hidden cursor-pointer"
              >
                <div className="overflow-hidden">
                  <img
                    src={image}
                    alt={data.name}
                    className="w-full aspect-[3/4] object-cover md:transition-transform md:duration-1000 md:group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent transition-all duration-700 group-hover:from-black group-hover:via-black/50" />

                <span className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 bg-white text-black px-2 py-1 sm:px-3 sm:py-2 uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[7px] sm:text-[9px] md:text-[10px]">
                  New
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-6 lg:p-7 transition-all duration-500 group-hover:-translate-y-2">
                  <p className="uppercase tracking-[0.15em] sm:tracking-[0.35em] text-[7px] sm:text-[10px] md:text-[11px] text-neutral-300">
                    {data.category}
                  </p>

                  <h3 className="font-serif text-[12px] min-[375px]:text-[14px] sm:text-xl md:text-2xl lg:text-[30px] mt-1 sm:mt-2 md:mt-3 leading-tight line-clamp-2">
                    {data.name}
                  </h3>

                  <div className="mt-2 sm:mt-4 md:mt-6 flex items-end justify-between gap-1">
                    <div className="flex flex-col items-start gap-0.5 sm:gap-1">
                      <p className="text-[11px] sm:text-sm md:text-lg text-white">
                        ₹{data.price}
                      </p>

                      <p className="text-[8px] sm:text-xs md:text-sm text-gray-400 line-through">
                        ₹{data.realPrice}
                      </p>
                    </div>

                    <button
                      className="flex items-center gap-1 sm:gap-2 uppercase tracking-[0.1em] sm:tracking-[0.25em] text-[8px] sm:text-[10px] md:text-[11px] text-white transition-all duration-500 lg:opacity-0 lg:translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 border-b border-white/40 pb-1 shrink-0"
                      onClick={() =>
                        navigate("/productInfo", {
                          state: { product: data },
                        })
                      }
                    >
                      View
                      <RiArrowRightLongFill size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenCollection;
