import React from "react";
import { motion } from "motion/react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { PiMinusLight } from "react-icons/pi";
import jacket1 from "../../../../../../assets/premjackets/jacket1.jpg";
import jacket2 from "../../../../../../assets/premjackets/jacket3.webp";
import jacket3 from "../../../../../../assets/premjackets/jacket4.webp";
const LuxurJackets = () => {
  const navigate = useNavigate();
  const jackets = [
    {
      id: 1,
      name: "Signature Leather Jacket",
      category: "Leather",
      price: "$289",
      image: jacket1,
    },
    {
      id: 2,
      name: "Classic Bomber Jacket",
      category: "Bomber",
      price: "$249",
      image: jacket2,
    },
    {
      id: 3,
      name: "Premium Wool Coat",
      category: "Winter",
      price: "$329",
      image: jacket1,
    },
    {
      id: 4,
      name: "Minimal Black Jacket",
      category: "Minimal",
      price: "$219",
      image: jacket2,
    },
    {
      id: 5,
      name: "Luxury Puffer Jacket",
      category: "Puffer",
      price: "$269",
      image: jacket1,
    },
    {
      id: 6,
      name: "Vintage Denim Jacket",
      category: "Denim",
      price: "$199",
      image: jacket2,
    },
    {
      id: 7,
      name: "Tailored Suede Jacket",
      category: "Suede",
      price: "$359",
      image: jacket1,
    },
    {
      id: 8,
      name: "Premium Trench Coat",
      category: "Coat",
      price: "$399",
      image: jacket2,
    },
  ];
  return (
    <section className="bg-black  text-white min-h-screen overflow-hidden ">
      <div className="p-10 ">
        <h1 className="absolute top-24 left-0 text-[180px] lg:text-[260px] font-bold text-white/[0.03] uppercase pointer-events-none select-none">
          JACKETS
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
        {/* heading portion */}

        <div className="max-w-7xl mx-auto px-6  py-10 ">
          <motion.div
            className="text-center py-23 "
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
              Latest Arrival
            </p>
            <h2 className="font-serif text-3xl lg:text-5xl mt-3 ">
              premium jackets
            </h2>
            <p className="max-w-2xl m-auto mt-8 text-neutral-400 leading-8">
              Discover timeless silhouettes crafted from premium fabrics.
              Designed for modern elegance and everyday luxury.
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto pt-20 pb-32 ">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3 }}
              className="relative overflow-hidden rounded-sm"
            >
              <img
                src={jacket3}
                alt=""
                className="w-full h-[750px] object-cover bg-cover opacity-60 backdrop-grayscale-75 border border-black"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-black via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-14 left-14 max-w-xl">
                <p className="uppercase tracking-[0.4em] text-xs text-neutral-300">
                  Crafted For Every Season
                </p>

                <h2 className="font-serif text-5xl mt-5 leading-tight">
                  Timeless
                  <br />
                  Outerwear
                </h2>

                <p className="mt-6 text-neutral-300 leading-8">
                  Every jacket is carefully designed to combine luxurious
                  comfort, premium craftsmanship, and modern elegance.
                </p>
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14 ">
            {jackets.map((data, index) => (
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

        <div className="text-center pt-20">
          <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
            design
          </p>
          <h2 className="font-serif text-3xl lg:text-5xl mt-3  ">
            Where modern design meets lasting quality
          </h2>
        </div>
        <div className=" max-w-7xl mx-auto px-6  py-32 ">
          <div>
            <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
              trending now
            </p>
            <h2 className="font-serif text-4xl mt-3">Handpicked For You</h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pt-6 pb-6 snap-x snap-mandatory scrollbar-thin">
            {jackets.map((data, index) => (
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
          {/* <div className="flex flex-col justify-center items-center pt-17 ">
            <div className="flex gap-3 justify-center items-center">
              <AiOutlineClose className="text-white" size={27} />{" "}
              <span className="bg-white w-2xl h-1"></span>{" "}
              <AiOutlineClose className="text-white" size={27} />
            </div>
            <h3 className="uppercase text-3xl font-serif ">me</h3>
          </div> */}
        </div>
        <div>
        <h3 className="uppercase text-3xl font-serif tracking-widest">me</h3>
      </div>
      </div>
      
    </section>
  );
};

export default LuxurJackets;
