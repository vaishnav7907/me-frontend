import React from "react";
import { motion } from "motion/react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BrandSubpage = () => {
  const navigate = useNavigate();

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

  const bestSellers = [
    {
      id: 1,
      name: "Premium White Shirt",
      category: "T-Shirts",
      price: "$89",
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    },
    {
      id: 2,
      name: "Luxury Polo",
      category: "Shorts",
      price: "$95",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
    },
    {
      id: 3,
      name: "Classic Black Shirt",
      category: "InnerWear",
      price: "$110",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    },
    {
      id: 4,
      name: "Essential Linen Shirt",
      category: "Jackets",
      price: "$125",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    },
    {
      id: 5,
      name: "Oversized Tee",
      category: "Pants",
      price: "$75",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    },
    {
      id: 6,
      name: "Signature Oxford",
      category: "Shirts",
      price: "$130",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
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
      ? bestSellers
      : bestSellers.filter((item) => item.category === selectedCategory);
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

          <h2 className="text-5xl lg:text-7xl font-serif mt-5">{brand.name}</h2>

          <p className="max-w-2xl text-neutral-400 leading-8 mt-8">
            {brand.slogan}
          </p>
        </motion.div>
      </div>
      <div className="pt-20">
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
      </div>

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
        {/* <div className=" h-[2px] w-96 border border-gray-400 " /> */}
      </div>

      <div className=" max-w-7xl mx-auto px-6  py-32 ">
        <div>
          <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
            trending now
          </p>
          <h2 className="font-serif text-4xl mt-3">Best Sellers</h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pt-6 pb-6 snap-x snap-mandatory scrollbar-thin">
          {bestSellers.map((data, index) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="min-w-[320px] snap-center group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={data.image}
                  alt=""
                  className="w-full h-[450px] object-cover duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-7 left-7">
                  <p className="uppercase tracking-[0.25em] text-xs text-neutral-300">
                    {data.category}
                  </p>

                  <h3 className="font-serif text-2xl mt-2">{data.name}</h3>

                  <p className="text-neutral-300 mt-2">{data.price}</p>
                </div>
              </div>
              {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-l from-black via-black/20 to-transparent" /> */}
            </motion.div>
          ))}
        </div>
      </div>

      <section className=" pb-12 flex flex-col items-center">
        <div className="  text-center">
          <h2 className="text-5xl lg:text-6xl font-serif leading-tight">
            "Style isn't about trends.
            <br />
            It's about timeless confidence."
          </h2>

          <p className="uppercase tracking-[0.4em] text-neutral-500 mt-5">
            - {brand.name}
          </p>
        </div>
        <div className=" h-[2px] w-96 border-t border-b border-white/10 mt-10" />
      </section>
    </section>
  );
};

export default BrandSubpage;
