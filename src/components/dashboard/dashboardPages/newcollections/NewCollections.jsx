import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { UseMe } from "../../../context/Provider";
// import { UseMe } from "../../../context/Meprovider";

const NewCollections = () => {
  const { setGetProductCategory } = UseMe();
  const [getArrivalsbyCategory, setGetArrivalsbyCategory] = useState([]);

  const getAllLatestArrivals = async () => {
    try {
      const getlatestArrivalsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/latestArrivals`,
      );

      setGetArrivalsbyCategory(getlatestArrivalsApi.data.latestArrivalsData);

      console.log(
        "get Latest Arrivals",
        getlatestArrivalsApi.data.latestArrivalsData,
      );
    } catch (error) {
      console.log("error in get latest Arrivals", error);
    }
  };

  useEffect(() => {
    getAllLatestArrivals();
  }, []);

  return (
    <section className="bg-[#080808] text-white min-h-screen w-full py-10 sm:py-14 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 min-[375px]:px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/10 pb-7 sm:pb-10 mb-12 sm:mb-16 md:mb-20 gap-5 sm:gap-7 md:gap-10">
          <div className="min-w-0 w-full md:w-auto">
            <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[3px] sm:tracking-[5px] md:tracking-[7px] uppercase text-neutral-500 mb-3 sm:mb-5">
              Discover what is new
            </p>

            <h1 className="text-3xl min-[375px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-light tracking-tight leading-[1] sm:leading-[0.95]">
              NEW
              <span className="font-serif italic ml-1.5 min-[375px]:ml-2 sm:ml-3 text-white/70">
                Collections.
              </span>
            </h1>
          </div>

          <p className="w-full md:max-w-xs lg:max-w-sm text-[11px] min-[375px]:text-xs sm:text-sm md:text-base text-neutral-500 leading-5 sm:leading-6 md:leading-7 md:pb-2">
            A new perspective on everyday dressing. Explore our latest arrivals,
            carefully selected for a modern and timeless wardrobe.
          </p>
        </div>

        {/* Collections */}
        <div className="space-y-12 sm:space-y-16 md:space-y-24 lg:space-y-32">
          {getArrivalsbyCategory.map((data, index) => (
            <NavLink
              key={data._id}
              to={
                data.category === "Shirts"
                  ? "/premiumShirts"
                  : data.category === "Pants"
                    ? "/PremiumPants"
                    : data.category === "Jackets"
                      ? "/luxuryJackets"
                      : data.category === "T-Shirts"
                        ? "/Tshirts"
                        : data.category === "Innerwear"
                          ? "/latestInnerwears"
                          : data.category === "Shorts"
                            ? "/latestShorts"
                            : "#"
              }
              onClick={() => setGetProductCategory(data.category)}
              className={`group grid grid-cols-1 lg:grid-cols-12 items-center gap-5 sm:gap-7 md:gap-10 lg:gap-12 xl:gap-16 ${
                index % 2 !== 0 ? "lg:[direction:rtl]" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative lg:col-span-5 w-full overflow-hidden bg-[#151515] ${
                  index % 2 !== 0 ? "lg:[direction:ltr]" : ""
                }`}
              >
                {/* Image */}
                <div className="aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                  <img
                    src={data.arrivalsCategoryImage?.url}
                    alt={data.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 sm:duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-500 sm:duration-700" />

                {/* Gradient overlay for mobile text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:hidden" />

                {/* Category label */}
                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 md:top-7 md:left-7 z-10">
                  <span className="inline-block text-[8px] min-[375px]:text-[9px] sm:text-[10px] md:text-xs tracking-[1.5px] sm:tracking-[3px] md:tracking-[4px] uppercase border border-white/30 backdrop-blur-md bg-black/30 px-2.5 py-2 sm:px-4 sm:py-3">
                    ME — {data.category}
                  </span>
                </div>

                {/* Mobile Content - Inside Image */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 min-[375px]:p-5 sm:p-7 md:p-9 lg:hidden">
                  {/* Collection number */}
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                    <span className="text-[8px] min-[375px]:text-[9px] sm:text-[10px] tracking-[2px] sm:tracking-[3px] text-white/60">
                      COLLECTION
                    </span>

                    <span className="w-7 sm:w-9 h-px bg-white/40" />

                    <span className="text-[8px] min-[375px]:text-[9px] sm:text-[10px] tracking-[2px] sm:tracking-[3px] text-white/60">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(getArrivalsbyCategory.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Collection Name */}
                  <h2 className="text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-3 sm:mb-4 text-white break-words">
                    {data.name}
                  </h2>

                  {/* Description */}
                  {/* <p className="text-white/70 text-[11px] min-[375px]:text-xs sm:text-sm leading-5 sm:leading-6 max-w-lg sm:hidden">
                    {data.description}
                  </p> */}

                  {/* Explore Category */}
                  <div className="mt-3 sm:mt-4">
                    <span className="text-[8px] min-[375px]:text-[9px] sm:text-[10px] tracking-[2px] sm:tracking-[3px] uppercase text-white/50">
                      Explore {data.category}
                    </span>
                  </div>

                  {/* Explore Collection */}
                  <div className="mt-5 sm:mt-6">
                    <div className="inline-flex items-center gap-3 sm:gap-4 border-b border-white/60 pb-2.5 sm:pb-3 group-hover:border-white transition-all duration-500">
                      <span className="text-[9px] min-[375px]:text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] uppercase font-medium text-white">
                        Explore Collection
                      </span>

                      <span className="text-sm sm:text-lg text-white transition-transform duration-500 group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Content - Right Side */}
              <div
                className={`hidden lg:flex lg:col-span-7 w-full ${
                  index % 2 !== 0
                    ? "lg:[direction:ltr] lg:justify-end"
                    : "justify-start"
                }`}
              >
                <div className="w-full max-w-[620px] px-0 lg:px-8 xl:px-10">
                  {/* Collection number */}
                  <div className="flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
                    <span className="text-[10px] lg:text-xs tracking-[3px] text-neutral-500">
                      COLLECTION
                    </span>

                    <span className="w-10 lg:w-12 h-px bg-white/20" />

                    <span className="text-[10px] lg:text-xs tracking-[3px] text-neutral-500">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(getArrivalsbyCategory.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Name */}
                  <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light leading-[1.1] tracking-tight mb-5 lg:mb-8 text-white break-words">
                    {data.name}
                  </h2>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm md:text-base leading-7 md:leading-8 max-w-lg ">
                    {data.description}
                  </p>

                  {/* Category */}
                  <div className="mt-6 lg:mt-8">
                    <span className="text-[10px] tracking-[3px] lg:tracking-[4px] uppercase text-neutral-500">
                      Explore {data.category}
                    </span>
                  </div>

                  {/* Explore Collection */}
                  <div className="mt-8 lg:mt-12">
                    <div className="inline-flex items-center gap-4 lg:gap-5 border-b border-white/50 pb-3 lg:pb-4 group-hover:border-white transition-all duration-500">
                      <span className="text-[10px] lg:text-xs tracking-[3px] uppercase font-medium text-white">
                        Explore Collection
                      </span>

                      <span className="text-base lg:text-lg text-white transition-transform duration-500 group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Bottom footer */}
        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-28 pt-5 sm:pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <p className="text-[8px] min-[375px]:text-[9px] sm:text-[10px] tracking-[1.5px] sm:tracking-[3px] md:tracking-[4px] uppercase text-neutral-500">
            ME — Create Your Own Trend
          </p>

          <p className="text-[8px] min-[375px]:text-[9px] sm:text-[10px] tracking-[1.5px] sm:tracking-[3px] uppercase text-neutral-500">
            Designed for the modern wardrobe
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewCollections;
