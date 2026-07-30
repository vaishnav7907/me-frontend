import React from "react";

import women1 from "../../../../assets/women2.jpg";
import jacket1 from "../../../../assets/premjackets/jacket1.jpg";
import tshirt1 from "../../../../assets/tshirts/tshirt1.webp";
import { NavLink } from "react-router-dom";

const collections = [
  {
    id: "01",
    title: "Premium Shirts",
    image: women1,
    hover: "Shirts",
    description:
      "A well-crafted shirt is more than clothing—it's a statement of confidence. Designed with clean lines, exceptional comfort, and premium quality, our collection brings timeless elegance to every occasion.",
    path: "/premiumShirts",
  },
  {
    id: "02",
    title: "Luxury Jackets",
    image: jacket1,
    hover: "Jackets",
    description:
      "Crafted for every season, our jackets combine refined tailoring with premium fabrics, delivering warmth, durability, and effortless sophistication.",
    path: "/luxuryJackets",
  },
  {
    id: "03",
    title: "Essential T-Shirts",
    image: tshirt1,
    hover: "T-Shirts",
    description:
      "Minimal, versatile, and comfortable. Our premium T-shirts are designed with soft fabrics and modern silhouettes that elevate everyday style.",
    path: "/Tshirts",
  },
  {
    id: "04",
    title: "Premium Pants",
    // image: jeans,
    hover: "Jeans",
    description:
      "From relaxed fits to timeless classics, our denim collection is crafted to provide lasting comfort while maintaining a refined contemporary look.",
    path: "/PremiumPants",
  },
];

const NewCollections = () => {
  return (
    <div className="bg-black text-white min-h-screen px-8 lg:px-16 py-14 ">
      {/* Heading */}
      <div className="border-b border-white/10 pb-6 mb-20">
        <p className="uppercase tracking-[8px] text-gray-500 text-sm">
          Latest Arrival
        </p>

        <h1 className="text-5xl lg:text-6xl font-extralight mt-4">
          New Collections
        </h1>
      </div>

      {collections.map((data, index) => (
        <NavLink
          className={`flex flex-col lg:flex-row items-center gap-16 mb-32 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
          key={data.id}
          to={data.path}
        >
          <div className="group relative w-full max-w-[380px] h-[500px] border border-white/10 cursor-pointer overflow-hidden">
            <img
              src={data.image}
              alt={data.image}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* overlayyy */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            {/* hover textttt */}

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
              <h2 className="text-white text-4xl uppercase tracking-[8px] font-light">
                {data.hover}
              </h2>
            </div>
          </div>

          {/* content */}
          <div
            className={`flex-1 flex ${
              index % 2 !== 0 ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-xl">
              <p
                className={`text-7xl font-bold text-white/10 mb-4 ${
                  index % 2 !== 0 ? "text-right" : ""
                }`}
              >
                {data.id}
              </p>

              <h2
                className={`text-4xl font-light mb-6 ${
                  index % 2 !== 0 ? "text-right" : ""
                }`}
              >
                {data.title}
              </h2>

              <p className="text-gray-400 text-lg leading-9">
                {data.description}
              </p>

              <div
                className={`mt-10 ${index % 2 !== 0 ? "flex justify-end" : ""}`}
              >
                <button className="border border-white/20 px-8 py-3 uppercase tracking-[4px] hover:bg-white hover:text-black transition">
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default NewCollections;
