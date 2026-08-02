import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  IoArrowBack,
  IoStar,
  IoHeartOutline,
  IoAdd,
  IoRemove,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProductInfo = () => {
  const navigate = useNavigate();

  // Product images based on color
  const products = {
    White: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1200&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
    ],

    Black: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1200&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&q=80",
    ],

    Beige: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1200&q=80",
    ],
  };

  const [selectedColor, setSelectedColor] = useState("White");
  const [selectedImage, setSelectedImage] = useState(products.White[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <section className=" min-h-screen bg-black text-white">
      <div className="pl-5 pt-7 ">
        <button
          className="group flex items-center gap-3 "
          onClick={() => navigate(-1)}
        >
          <span className="text-xl transition-transform duration-300 group-hover:-translate-x-2">
            <IoArrowBack className="transition-transform duration-300 group-hover:-translate-x-1" />
          </span>
          <span className="uppercase tracking-[0.35em] text-sm">Back</span>
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-2 gap-16">
          <motion.div layout className="">
            <div>
              <div className="overflow-hidden rounded-3xl bg-neutral-900">
                <img
                  src={selectedImage}
                  alt=""
                  className="w-full h-[700px] object-cover hover:scale-110 transition duration-700"
                />
              </div>

              <div className="grid grid-cols-4 gap-4 mt-5">
                {products.White.map((data, index) => (
                  <button
                    className="overflow-hidden rounded-xl border border-white/10 hover:border-white"
                    key={index}
                  >
                    <img
                      src={data}
                      alt=""
                      className="h-32 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          <div>
            <div>
              <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
                premium collection
              </p>

              <h3 className="text-5xl font-light mt-3">
                Essential White Shirt
              </h3>
              <div className="flex items-center gap-2 mt-5">
                <span className=" flex gap-1 items-center">
                  <IoStar className="text-yellow-400" />
                  <IoStar className="text-yellow-400" />
                  <IoStar className="text-yellow-400" />
                  <IoStar className="text-yellow-400" />
                  <IoStar className="text-yellow-400" />
                </span>
                <div className="flex gap-2 text-white/60 ml-2">
                  <p>4.9</p>
                  <p>(128 Reviews)</p>
                </div>
              </div>
              <h2 className="text-4xl mt-8 font-semibold">₹2,999</h2>
              <p className="text-white/60 leading-8 mt-8">
                Crafted from premium cotton for exceptional comfort and
                durability. Designed with a modern tailored fit that pairs
                effortlessly with formal and casual outfits.
              </p>

              <div className="mt-10">
                <h4 className="mb-4 text-lg">Select Color</h4>
                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-white"></div>
                </div>
                <p className="mt-3 text-white/60">
                  Selected Color:
                  <span className="text-white ml-2">White</span>{" "}
                </p>
              </div>

              <div className="mt-10">
                <h4 className="mb-4 text-lg">Select Size</h4>
                <div className=" flex gap-5 items-center">
                  <div className="w-10 h-10 rounded-full  border-2 border-white/20 hover:border-white flex justify-center items-center">
                    S
                  </div>
                  <div className="w-10 h-10 rounded-full  border-2 border-white/20 hover:border-white flex justify-center items-center">
                    M
                  </div>
                  <div className="w-10 h-10 rounded-full  border-2 border-white/20 hover:border-white flex justify-center items-center">
                    L
                  </div>
                  <div className="w-10 h-10 rounded-full  border-2 border-white/20 hover:border-white flex justify-center items-center">
                    XL
                  </div>
                  <div className="w-10 h-10 rounded-full  border-2 border-white/20 hover:border-white flex justify-center items-center">
                    XXL
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="mb-4 text-lg">Quantity</h4>
                  <div className=" flex items-center gap-3">
                    <p className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition">
                      <IoRemove />
                    </p>
                    <p className="text-2xl font-medium">1</p>
                    <p className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition">
                      <IoAdd />
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 mt-12">
                  <button className="flex-1 bg-white text-black py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition">
                    Add to Cart
                  </button>
                  <button className="border border-white rounded-full hover:bg-white hover:text-black transition py-4 text-lg flex-1">
                    Buy Now
                  </button>
                </div>
                <div className="h-[2px]  w-full bg-white/10 mt-12 " />

                <div className="mt-12 pt-8 space-y-5">
                  <div className="flex justify-between">
                    <p className="text-white/60">Material</p>
                    <p>100% Premium Cotton</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-white/60">Fit</p>
                    <p>Regular Fit</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-white/60">Sleeve</p>
                    <p>Full Sleeve</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-white/60">Country</p>
                    <p>Made in India</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-white/60">Delivery</p>
                    <p>3-5 Bussiness Days</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-white/60">Returns</p>
                    <p>30-Day Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
