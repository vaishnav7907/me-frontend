
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { UseMe } from "../../../../../context/Meprovider";
import axios from "axios";
const Shorts = () => {
    const navigate = useNavigate();

  const { getProductCategory } = UseMe();
  const [latestShorts, setLatestShorts] = useState([]);

  const getLatestArrivalsShorts = async () => {
    try {
      const latestArrivalsShortsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getProductsByCategory/${getProductCategory}`,
      );

      setLatestShorts(latestArrivalsShortsApi.data.products);

      console.log(
        "get Latest Arrivals shirts",
        latestArrivalsShortsApi.data.products,
      );
    } catch (error) {
      console.log("error in get latest Arrivals shirts", error.message);
    }
  };

  const handPickedShorts = latestShorts.filter(
    (product) => product.isHandPicked === true,
  );
  useEffect(() => {
    if (getProductCategory) {
      getLatestArrivalsShorts();
    }
  }, [getProductCategory]);
  return (

    <section className="bg-black text-white min-h-screen overflow-hidden">
      <h1 className="absolute top-24 left-0 text-[180px] lg:text-[260px] font-bold text-white/[0.03] uppercase pointer-events-none select-none">
        T-SHIRTS
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

      {/* <div
        className="absolute top-40 right-40 w-[500px] h-[600px] bg-cover bg-center bg-no-repeat opacity-30 grayscale-75 overflow-hidden "
        style={{ backgroundImage: `url(${tshirt1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/5 to-transparent" />
      </div> */}

      {/* heading portion */}

      <div className="  pt-32 ">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
            Latest Arrival
          </p>
          <h2 className="font-serif text-5xl lg:text-7xl mt-6">
            {/* Essential <span className="text-red-950">T</span>-Shorts */}
            Latest Shorts
          </h2>
          <p className="max-w-2xl mx-auto mt-8 text-neutral-400 leading-8">
            Discover timeless silhouettes crafted from premium fabrics. Designed
            for modern elegance and everyday luxury.
          </p>
        </motion.div>
      </div>
      <div className="grid grid-cols-4 py-20">
        {latestShorts.map((items, index) => (
          <motion.div
            key={items.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="h-4/5 overflow-hidden relative">
              <img
                src={items.variants?.[0]?.color?.mainImage?.url}
                alt={items.name}
                className="h-full w-full object-cover  "
              />
              {/* <div className="absolute inset-0 bg-gradient-to-l from-black via-black/5 to-transparent" /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
            </div>
            <div className="h-1/5 flex flex-col gap-3 p-2">
              <div>
                <p className="uppercase tracking-[0.04em] text-neutral-500 text-sm">
                  {items.category}
                </p>
                <h3 className="font-serif tracking-wide">{items.name}</h3>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-white">
                  ₹{items.price}
                </p>

                <p className="text-sm text-green-500">{items.discount}% OFF</p>

                <p className="text-sm text-neutral-500 line-through ">
                  ₹{items.realPrice}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {handPickedShorts.length > 0 && (
        <div className=" max-w-7xl mx-auto px-6  py-10 ">
          <div>
            <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
              trending now
            </p>
            <h2 className="font-serif text-4xl mt-3">Handpicked For You</h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pt-6 pb-6 snap-x snap-mandatory scrollbar-thin">
            {handPickedShorts.map((data, index) => (
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
                    src={data.variants?.[0]?.color?.mainImage?.url}
                    alt={data.name}
                    className="w-full h-[450px] object-cover duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-7 left-7">
                    <p className="uppercase tracking-[0.25em] text-xs text-neutral-300">
                      {data.category}
                    </p>

                    <h3 className="font-serif text-2xl mt-2">{data.name}</h3>

                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-white">
                        ₹{data.price}
                      </p>

                      <p className="text-sm text-green-500">
                        {data.discount}% OFF
                      </p>

                      <p className="text-sm text-neutral-500 line-through ">
                        ₹{data.realPrice}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-l from-black via-black/20 to-transparent" /> */}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default Shorts
