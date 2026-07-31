import React, { useState } from "react";
import { motion } from "motion/react";
import pant1 from "../../../../assets/pants/pants1.jpg"
import pant2 from "../../../../assets/pants/pants3.webp"
import shirt1 from "../../../../assets/premiumshirts/premiumshirt1.jpg"
import shirt2 from "../../../../assets/premiumshirts/premiumshirt2.jpg"
import jacket1 from "../../../../assets/premjackets/jacket3.webp"
import tshirt1 from "../../../../assets/tshirts/tshirt1.webp"
const MenCollection = () => {
  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      image:shirt1,
      category: "Shirts",
      price: "$79",
    },
    {
      id: 2,
      name: "Oversized T-Shirt",
      image:tshirt1,
      category: "T-Shirts",
      price: "$45",
    },
    {
      id: 3,
      name: "Slim Fit Jeans",
      image:pant1,
      category: "Pants",
      price: "$99",
    },
    {
      id: 4,
      name: "Essential Hoodie",
      image:shirt2,
      category: "InnerWear",
      price: "$95",
    },
    {
      id: 5,
      name: "Leather Jacket",
      image:jacket1,
      category: "Jackets",
      price: "$199",
    },
    {
      id: 6,
      name: "Tailored Blazer",
      image:pant2,
      category: "Shorts",
      price: "$179",
    },
  ];

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
                  <motion.div className="w-full h-[2px] left-0 bottom-0 bg-white absolute" layoutId="smooth"  transition={{
      type: "spring",
      stiffness: 300,
      damping: 30,
    }}>

                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14 ">
        {filteredProducts.map((data, index) => (
          <motion.div
            key={data.id}
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
                src={data.image}
                alt={data.name}
                className="w-full h-[430px] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>

            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/5 to-transparent " /> */}
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

              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg text-white">{data.price}</span>

                <button className="flex items-center gap-2 uppercase tracking-[0.25em] text-[11px] opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  View
                  <span>→</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MenCollection;
