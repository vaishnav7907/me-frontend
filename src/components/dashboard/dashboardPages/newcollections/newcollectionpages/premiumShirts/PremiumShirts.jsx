import React from "react";
import premiumshirt1 from "../../../../../../assets/premiumshirts/premiumshirt1.jpg";
import premiumshirt2 from "../../../../../../assets/premiumshirts/premiumshirt2.jpg";
import { motion } from "motion/react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const PremiumShirts = () => {
  const navigate = useNavigate();
  
  const shirts = [
    {
      id: 1,
      name: "Oxford White",
      price: "$89",
      image: premiumshirt1,
      category: "Essential",
    },
    {
      id: 2,
      name: "Midnight Black",
      price: "$94",
      image: premiumshirt2,
      category: "Premium",
    },
    {
      id: 3,
      name: "Stone Linen",
      price: "$86",
      image: premiumshirt1,
      category: "Linen",
    },
    {
      id: 4,
      name: "Classic Blue",
      price: "$91",
      image: premiumshirt2,
      category: "Formal",
    },
    {
      id: 5,
      name: "Modern Fit",
      price: "$88",
      image: premiumshirt1,
      category: "Casual",
    },
    {
      id: 6,
      name: "Minimal Grey",
      price: "$90",
      image: premiumshirt2,
      category: "Luxury",
    },
    {
      id: 6,
      name: "Minimal Grey",
      price: "$90",
      image: premiumshirt2,
      category: "Luxury",
    },
    {
      id: 6,
      name: "Minimal Grey",
      price: "$90",
      image: premiumshirt2,
      category: "Luxury",
    },
    {
      id: 6,
      name: "Minimal Grey",
      price: "$90",
      image: premiumshirt2,
      category: "Luxury",
    },
    {
      id: 6,
      name: "Minimal Grey",
      price: "$90",
      image: premiumshirt2,
      category: "Luxury",
    },
  ];
  return (
    <section className="bg-black text-white min-h-screen overflow-hidden">
      <h1 className="absolute top-24 left-0 text-[180px] lg:text-[260px] font-bold text-white/[0.03] uppercase pointer-events-none select-none">
        SHIRTS
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

      <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-32">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
            Latest Arrival
          </p> */}
          <h2 className="font-serif text-5xl lg:text-7xl mt-6">
            Latest Arrival
          </h2>
          <p className="max-w-2xl mx-auto mt-8 text-neutral-400 leading-8">
            Discover timeless silhouettes crafted from premium fabrics. Designed
            for modern elegance and everyday luxury.
          </p>
        </motion.div>

        {/* content section */}
        <motion.div
          className="grid  lg:grid-cols-5 gap-8 mt-24"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* large image */}

          <div className="lg:col-span-3 overflow-hidden relative group" onClick={()=>navigate("/productInfo")}>
            <img
              src={premiumshirt1}
              alt=""
              className=" h-[720px] w-full object-cover  group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="absolute top-8 left-8 ">
              <span className="bg-white text-black px-5 py-2 tracking-[0.3em] text-xs">
                new arrival
              </span>
            </div>

            <div className="absolute bottom-10 left-10 ">
              <p className="tracking-[0.35em] uppercase text-neutral-300 text-sm">
                Signature Collection
              </p>

              <h1 className="font-serif text-5xl mt-5">Oxford White</h1>

              <p className="text-neutral-300 max-w-md mt-5 leading-7">
                A timeless white shirt crafted with luxurious cotton and
                tailored for effortless sophistication.
              </p>

              <button className="mt-8 border border-white px-8 py-3 hover:bg-white hover:text-black duration-300">
                Explore
              </button>
            </div>
          </div>
          {/* smll img */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {shirts.slice(1, 3).map((items, index) => (
              <motion.div
                className="h-[346px] overflow-hidden group cursor-pointer relative"
                key={items}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
              >
                <img
                  src={items.image}
                  alt=""
                  className="w-full h-full object-cover "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="tracking-[0.25em] uppercase text-xs text-neutral-300">
                    {items.category}
                  </p>

                  <h3 className="font-serif text-3xl mt-3">{items.name}</h3>

                  <div className="flex items-center gap-6 mt-4">
                    <span className="text-neutral-300">{items.price}</span>

                    <button className="opacity-0 group-hover:opacity-100 duration-500 border-b border-white">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* latest shirt///// */}
        <div className=" max-w-7xl mx-auto px-6  py-32 ">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between  mb-16">
              <div>
                <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
                  editorial collection
                </p>
                <h2 className="font-serif text-5xl mt-4">
                  Latest Premium Shirts
                </h2>
              </div>

              <div>
                <p className="text-neutral-400 max-w-lg mt-6 lg:mt-0 leading-8">
                  Every shirt is designed with precision tailoring, premium
                  fabrics, and timeless silhouettes that elevate everyday
                  dressing.
                </p>
              </div>
            </div>
          </motion.div>

          <div className=" grid grid-cols-4 gap-6 auto-rows-[346px]">
            {shirts.map((data, index) => {
              const large = index === 0 || index === 3;
              return (
                <motion.div
                  className={` overflow-hidden group cursor-pointer relative ${large ? "lg:row-span-2" : ""}`}
                  key={data.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={data.image}
                    alt=""
                    className={`w-full h-full object-cover duration-700 group-hover:scale-110  ${large ? "h-[666px]" : "h-[330px]"} `}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <span className="absolute top-5 left-5 bg-white text-black text-[10px] tracking-[0.3em] px-3 py-2 uppercase">
                    New
                  </span>
                  <div className="absolute bottom-7 left-7 right-7 ">
                    <p className="tracking-[0.25em] uppercase text-xs text-neutral-300">
                      {data.category}
                    </p>

                    <h3 className="font-serif text-3xl mt-3">{data.name}</h3>

                    <div className="flex items-center gap-6 mt-4">
                      <span className="text-neutral-300">{data.price}</span>

                      <button className="opacity-0 group-hover:opacity-100 duration-500 border-b border-white">
                        View
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <hr className="w-full text-gray-500" />

        <motion.div
          className=" max-w-7xl mx-auto px-6  py-32 "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
              crafted for you
            </p>
            <h2 className="font-serif text-4xl lg:text-6xl leading-tight mt-8">
              <span className="text-[#D4AF37]">Luxury</span> isn't about excess.
              <br />
              It's about choosing pieces
              <br />
              you'll wear for years.
            </h2>
          </div>
        </motion.div>
        <hr className="w-full text-gray-500" />
        <div className=" max-w-7xl mx-auto px-6  py-32 ">
          <div>
            <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
              trending now
            </p>
            <h2 className="font-serif text-4xl mt-3">Handpicked For You</h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pt-6 pb-6 snap-x snap-mandatory scrollbar-thin">
            {shirts.map((data, index) => (
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
                <div className="relative overflow-hidden">
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
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6  py-10 text-center">
          <h2 className="font-serif text-4xl mt-3">
            Crafted for confidence. Designed by ME.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default PremiumShirts;
