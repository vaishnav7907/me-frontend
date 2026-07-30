import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import pants1 from "../../../../../../assets/pants/pants1.jpg";
import pants2 from "../../../../../../assets/pants/pants2.jpg";
import pants3 from "../../../../../../assets/pants/pants3.webp";
import pants4 from "../../../../../../assets/pants/pants4.jpg";
const PremiumPants = () => {
  const navigate = useNavigate();
  const pants = [
    {
      id: 1,
      name: "Signature Leather Jacket",
      category: "Leather",
      price: "$289",
      image: pants1,
    },
    {
      id: 2,
      name: "Classic Bomber Jacket",
      category: "Bomber",
      price: "$249",
      image: pants2,
    },
    {
      id: 3,
      name: "Premium Wool Coat",
      category: "Winter",
      price: "$329",
      image: pants3,
    },
    {
      id: 4,
      name: "Minimal Black Jacket",
      category: "Minimal",
      price: "$219",
      image: pants4,
    },
    {
      id: 5,
      name: "Luxury Puffer Jacket",
      category: "Puffer",
      price: "$269",
      image: pants1,
    },
    {
      id: 6,
      name: "Vintage Denim Jacket",
      category: "Denim",
      price: "$199",
      image: pants2,
    },
    {
      id: 7,
      name: "Tailored Suede Jacket",
      category: "Suede",
      price: "$359",
      image: pants3,
    },
    {
      id: 8,
      name: "Premium Trench Coat",
      category: "Coat",
      price: "$399",
      image: pants4,
    },
  ];
  return (
    <section className="bg-black  text-white min-h-screen overflow-hidden  pb-20">
      <div className="p-10 ">
        <h1 className="absolute top-24 left-0 text-[180px] lg:text-[260px] font-bold text-white/[0.03] uppercase pointer-events-none select-none">
          PANTS
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
              premium Pants
            </h2>
            <p className="max-w-2xl m-auto mt-8 text-neutral-400 leading-8">
              Discover timeless silhouettes crafted from premium fabrics.
              Designed for modern elegance and everyday luxury.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="grid grid-cols-4 py-10">
        {pants.map((items, index) => (
          <motion.div
            key={items.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="h-4/5 overflow-hidden relative">
              <img
                src={items.image}
                alt=""
                className="h-full w-full object-cover  "
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black via-black/5 to-transparent" />
              {/* <div className="absolute inset-0 bg-gradient-to-b from-black via-black/5 to-transparent" /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
            </div>
            <div className="h-1/5 flex flex-col gap-3 p-2">
              <div>
                <p className="uppercase tracking-[0.04em] text-neutral-500 text-sm">
                  {items.category}
                </p>
                <h3 className="font-serif tracking-wide">{items.name}</h3>
              </div>

              <p className="uppercase tracking-[0.04em] text-neutral-500 text-sm">
                {items.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className=" max-w-7xl mx-auto px-6  py-10  ">
        <div>
          <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
            trending now
          </p>
          <h2 className="font-serif text-4xl mt-3">Handpicked For You</h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pt-10 pb-6 snap-x snap-mandatory scrollbar-thin">
          {pants.map((data, index) => (
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
    </section>
  );
};

export default PremiumPants;
