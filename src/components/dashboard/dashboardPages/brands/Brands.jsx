import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Brands = () => {
  const navigate = useNavigate();

  const [getBrands, setGetBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBrands = async () => {
    try {
      const getBrandsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getBrand`,
      );

      setGetBrands(getBrandsApi.data.brand);
    } catch (error) {
      console.log("error in get brands frontend", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  const defaultBackground =
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85";

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <section className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-14 lg:py-28">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/[0.025] blur-[150px]" />

        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-white/[0.025] blur-[150px]" />

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative mx-auto mb-16 max-w-4xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-5">
            <div className="h-px w-10 bg-zinc-700" />

            <p className="text-[10px] font-light uppercase tracking-[0.45em] text-zinc-400 sm:text-xs">
              Discover Our Brands
            </p>

            <div className="h-px w-10 bg-zinc-700" />
          </div>

          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-[76px]">
            Shop by <span className="italic text-zinc-500">Brand</span>
          </h1>

          <div className="mx-auto my-8 h-px w-14 bg-zinc-500" />

          <p className="mx-auto max-w-2xl text-sm font-light leading-7 text-zinc-400 sm:text-base">
            Discover premium men's fashion from the world's most trusted brands.
            <br className="hidden sm:block" />
            Choose your favorite label and explore timeless collections crafted
            for every style.
          </p>
        </motion.div>

        {loading && (
          <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="h-[295px] animate-pulse rounded-xl bg-zinc-900"
              />
            ))}
          </div>
        )}

        {!loading && getBrands.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm text-zinc-500">No brands available.</p>
          </div>
        )}

        {!loading && getBrands.length > 0 && (
          <div className="relative mx-auto grid max-w-[1450px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {getBrands.map((brand, index) => {
              const backgroundImage =
                brand.brandImage?.url || defaultBackground;

              return (
                <motion.div
                  key={brand._id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.06,
                  }}
                  onClick={() => navigate(`/BrandSubpage/${brand._id}`)}
                  className="group relative h-[295px] cursor-pointer overflow-hidden rounded-xl border border-zinc-700/70"
                >
                  <img
                    src={backgroundImage}
                    alt={brand.brandName}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10" />

                  <div className="absolute left-5 top-5 z-20 flex items-center gap-3">
                    <span className="text-sm font-light text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="h-px w-7 bg-white/70" />
                  </div>

                  <div className="absolute inset-0 z-10 flex items-center justify-center px-8 pb-10">
                    {brand.brandIcon?.url && (
                      <img
                        src={brand.brandIcon.url}
                        alt={brand.brandName}
                        className="max-h-[100px] max-w-[210px] object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)]"
                      />
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                    <div className="flex min-h-[72px] items-end justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-lg font-medium leading-tight text-white">
                          {brand.brandName}
                        </h3>

                        <div className="mt-1 h-[34px] overflow-hidden">
                          {brand.brandSlogan && (
                            <p className="line-clamp-2 text-xs leading-[17px] text-white/60">
                              {brand.brandSlogan}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 pb-1 text-sm text-white">
                        <span>Explore</span>

                        <GoArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-xl border border-white/0 transition-all duration-500 group-hover:border-white/30" />
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && getBrands.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.5,
              duration: 0.7,
            }}
            className="mt-14 flex items-center justify-center gap-5"
          >
            <div className="h-px w-16 bg-zinc-800" />

            <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500">
              Premium Brands
            </p>

            <span className="text-zinc-700">/</span>

            <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500">
              Timeless Style
            </p>

            <div className="h-px w-16 bg-zinc-800" />
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Brands;
