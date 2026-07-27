import React from "react";
import { motion } from "motion/react";
import { GoArrowUpRight } from "react-icons/go";
const brands = [
  {
    name: "Zara",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
  },
  {
    name: "H&M",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
  },
  {
    name: "Levi's",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Levi%27s_logo.svg",
  },
  {
    name: "Calvin Klein",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Calvin_Klein_logo.svg",
  },
  {
    name: "Tommy Hilfiger",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Tommy_Hilfiger_logo.svg",
  },
  {
    name: "Louis Philippe",
    logo: "/brands/louis-philippe.png",
  },
  {
    name: "Van Heusen",
    logo: "/brands/van-heusen.png",
  },
  {
    name: "Allen Solly",
    logo: "/brands/allen-solly.png",
  },
];

const MenCollection = () => {
  return (
    <section className="bg-black text-white py-24 px-6 lg:px-20">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-serif">
          Shop by <span className="text-gray-400">Brand</span>
        </h2>

        <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
          Discover premium men's fashion from the world's most trusted brands.
          Choose your favorite label and explore timeless collections crafted
          for every style.
        </p>
      </motion.div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {brands.map((brand, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group border border-zinc-800 rounded-2xl bg-zinc-950 hover:border-white transition-all duration-300 p-8 flex flex-col items-center justify-center"
          >
            <div className="h-16 flex items-center justify-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-12 object-contain grayscale group-hover:grayscale-0 transition duration-300"
              />
            </div>

            <h3 className="mt-6 text-lg font-medium">{brand.name}</h3>

            <button className="mt-5 flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition">
              Explore
              <GoArrowUpRight className="text-lg" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MenCollection;