import React from "react";
import { motion } from "motion/react";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";


const Sales = () => {
  const navigate= useNavigate()
  
const offers = [
  {
    title: "Summer Sale",
    offer: "Up to 50% Off",
    description:
      "Discover timeless pieces at exclusive seasonal prices for a limited time.",
  },
  {
    title: "Buy 2 Get 1",
    offer: "Free Item",
    description:
      "Purchase any two selected outfits and receive one additional item at no extra cost.",
  },
  {
    title: "First Order",
    offer: "20% Off",
    description:
      "Welcome offer for new customers shopping with us for the first time.",
  },
  {
    title: "Weekend Deal",
    offer: "Extra 15% Off",
    description:
      "Enjoy additional savings on all premium collections this weekend only.",
  },
];
  return (
    <section className="bg-black text-white px-6 lg:px-20 py-28">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl"
      >
        <p className="uppercase  tracking-[6px] text-gray-500 text-sm">
          Limited Time
        </p>

        <h2 className="text-5xl font-serif mt-4 leading-tight ">
          Exclusive <br /> <span className="text-zinc-500">Offers</span>
        </h2>
        <p className="text-gray-500 mt-6 text-lg">
          Explore limited-time promotions and exclusive savings on our premium
          fashion collections.
        </p>
      </motion.div>

      <div className="mt-20 border-t border-zinc-800">
        {offers.map((data,index) => (
          <motion.div key={data.title} className="group flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-b border-zinc-800 py-10 cursor-pointer hover:border-zinc-600 transition-colors duration-300"   initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{  duration: 0.5,delay: index * 0.08 }}
            whileHover={{ x: 8 }}>
           
              <div>
                <p className="uppercase tracking-[4px] text-gray-500 text-sm">
                  {data.title}
                </p>
                <h2 className="text-3xl lg:text-5xl font-serif mt-3 group-hover:tracking-wide transition-all duration-500">
                  {data.offer}
                </h2>
                <p className="text-gray-500 mt-5 max-w-xl leading-7">
                  {data.description}
                </p>
              </div>
              <div className=" flex items-center gap-5">
                <span className="text-zinc-500 group-hover:text-white transition">Shop Now</span>
                <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <GoArrowUpRight size={22 }  onClick={()=>navigate("/Offers")}/>
                </div>
              </div>
            
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Sales;
