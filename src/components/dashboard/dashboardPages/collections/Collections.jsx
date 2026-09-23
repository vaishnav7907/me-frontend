import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { RiArrowRightLongFill } from "react-icons/ri";
import axios from "axios";
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

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [getAllProducts, setGetAllProducts] = useState([]);

  const [loading, setLoading] = useState(true);
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
      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="uppercase tracking-[8px] text-sm text-gray-500"
        >
          Premium Fashion
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-extralight mt-6"
        >
          Men's Collection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mt-8 text-gray-500 leading-8"
        >
          Discover timeless menswear crafted with premium fabrics, modern
          tailoring and effortless elegance.
        </motion.p>
      </section>

      {/* Category Navbar */}

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
                  ></motion.div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14 px-3" >
          {filteredProducts.map((data, index) => {
            const image = data.variants?.[0]?.images?.[0]?.url;
            return (
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
                  transition: { duration: 0.35, ease: "easeOut" },
                }}
                className="group relative overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={image}
                    alt={data.name}
                    className="w-full h-[460px] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent transition-all duration-700 group-hover:from-black group-hover:via-black/50" />{" "}
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
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex  flex-col items-center gap-1">
                      <p className="text-lg text-white">₹{data.price}</p>

                      <p className="text-sm text-gray-500 line-through">
                        ₹{data.realPrice}
                      </p>
                    </div>

                    <button className="flex items-center gap-2 uppercase tracking-[0.25em] text-[11px] opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      View
                      <span>
                        <RiArrowRightLongFill size={16} />
                      </span>
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
