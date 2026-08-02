import React, { useState } from "react";
import {
  IoArrowBack,
  IoStar,
  IoHeartOutline,
  IoAdd,
  IoRemove,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
const CartOrder = () => {
  const navigate = useNavigate();
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
    <section className="bg-black min-h-screen relative text-white">
      <button
        className="group flex items-center gap-3 absolute top-10 left-7"
        onClick={() => navigate(-1)}
      >
        <span className="text-xl transition-transform duration-300 group-hover:-translate-x-2">
          <IoArrowBack className="transition-transform duration-300 group-hover:-translate-x-1" />
        </span>
        <span className="uppercase tracking-[0.35em] text-sm">Back</span>
      </button>

      <div className="max-w-7xl mx-auto px-8 py-32">
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
              <h3 className="text-5xl font-light ">Cart Order</h3>
              <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm mt-7">
                premium collection
              </p>

              <div className="border-b border-t border-white/20 py-5  flex  flex-col  mt-7">
                <div className="flex  gap-3 overflow-x-auto ">
                  {products.White.map((data, index) => (
                    <div
                      className="overflow-hidden rounded-xl border border-white/10 hover:border-white"
                      key={index}
                    >
                      <img src={data} alt="" className="h-32 w-32" />
                    </div>
                  ))}
                </div>

                <div>

                    <div className="flex mt-5 gap-1">
                        <span ><IoStar className="text-yellow-400"/></span>
                        <span ><IoStar className="text-yellow-400"/></span><span ><IoStar className="text-yellow-400"/></span><span ><IoStar className="text-yellow-400"/></span><span ><IoStar className="text-yellow-400"/></span><span ><IoStar className="text-yellow-400"/></span>
                    </div>
                  <p className="mt-3 text-white/60">
                    Color:
                    <span className="text-white ml-2">White</span>
                  </p>
                  <p className="mt-3 text-white/60">
                    Size:
                    <span className="text-white ml-2">M</span>
                  </p>

                  <p className="mt-3 text-white ">
                    Prize:
                    <span className="text-white ml-2">3790</span>
                  </p>
                </div>
              </div>
              

              <div className="mt-10">
               

                <div className="flex gap-5 mt-12">
                  <button className="flex-1 bg-white text-black py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition">
                    Add to Cart
                  </button>
                  <button className="border border-white rounded-full hover:bg-white hover:text-black transition py-4 text-lg flex-1">
                    Buy Now
                  </button>
                </div>
                <div className="h-[2px]  w-full bg-white/10 mt-12 " />

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartOrder;
