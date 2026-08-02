import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { IoArrowBack } from "react-icons/io5";
import pant1 from "../../../../../assets/pants/pants1.jpg";
import pant2 from "../../../../../assets/pants/pants3.webp";
import shirt1 from "../../../../../assets/premiumshirts/premiumshirt1.jpg";
import shirt2 from "../../../../../assets/premiumshirts/premiumshirt2.jpg";
import jacket1 from "../../../../../assets/premjackets/jacket3.webp";
import tshirt1 from "../../../../../assets/tshirts/tshirt1.webp";
const OfferPage = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      image: shirt1,
      category: "Shirts",
      price: "$79",
    },
    {
      id: 2,
      name: "Oversized T-Shirt",
      image: tshirt1,
      category: "T-Shirts",
      price: "$45",
    },
    {
      id: 3,
      name: "Slim Fit Jeans",
      image: pant1,
      category: "Pants",
      price: "$99",
    },
    {
      id: 4,
      name: "Essential Hoodie",
      image: shirt2,
      category: "InnerWear",
      price: "$95",
    },
    {
      id: 5,
      name: "Leather Jacket",
      image: jacket1,
      category: "Jackets",
      price: "$199",
    },
    {
      id: 6,
      name: "Tailored Blazer",
      image: pant2,
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
    <section className="bg-black text-white min-h-screen overflow-hidden ">
      <h1 className="absolute top-24 left-0 text-[180px] lg:text-[260px] font-bold text-white/[0.03] uppercase pointer-events-none select-none">
        Offers
      </h1>

      <button
        className="group flex items-center gap-3 absolute top-10 left-7"
        onClick={() => navigate(-1)}
      >
        <span className="text-xl transition-transform duration-300 group-hover:-translate-x-2">
          <IoArrowBack className="transition-transform duration-300 group-hover:-translate-x-1" />
        </span>
        <span className="uppercase tracking-[0.35em] text-sm">Back</span>
      </button>
      <section className="max-w-7xl mx-auto px-6 py-28">
        <p className="uppercase tracking-[10px] text-gray-500 text-sm">
          Exclusive Event
        </p>

        <h1 className="mt-6 text-[80px] md:text-[140px] font-black leading-none">
          50%
        </h1>

        <h2 className="text-4xl md:text-6xl font-light mt-6">OFF EVERYTHING</h2>

        <p className="mt-10 max-w-xl text-gray-400 leading-8">
          Upgrade your wardrobe with timeless essentials and premium tailoring.
        </p>
      </section>
      <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-xl border-y border-white/10 ">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14 pb-16">
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
    </section>
  );
};

export default OfferPage;
