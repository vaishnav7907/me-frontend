import React from "react";
import { motion } from "motion/react";
import { GoArrowUpRight, GoTrash } from "react-icons/go";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate= useNavigate()
  const cartItems = [
    {
      id: 1,
      brand: "Zara",
      name: "Oversized Linen Shirt",
      size: "M",
      color: "Black",
      quantity: 1,
      price: 89,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    },
    {
      id: 2,
      brand: "Levi's",
      name: "Straight Fit Jeans",
      size: "32",
      color: "Blue",
      quantity: 2,
      price: 120,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    },
    {
      id: 2,
      brand: "Levi's",
      name: "Straight Fit Jeans",
      size: "32",
      color: "Blue",
      quantity: 2,
      price: 120,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    },
    {
      id: 2,
      brand: "Levi's",
      name: "Straight Fit Jeans",
      size: "32",
      color: "Blue",
      quantity: 2,
      price: 120,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    },
    {
      id: 2,
      brand: "Levi's",
      name: "Straight Fit Jeans",
      size: "32",
      color: "Blue",
      quantity: 2,
      price: 120,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    },
  ];
  return (
    <section className="min-h-screen bg-black text-white px-6 lg:px-20 py-28">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <p className="uppercase tracking-[6px] text-gray-500 text-sm">
          Your Selection
        </p>

        <h1 className="text-5xl lg:text-7xl font-serif mt-4">
          Car<span className="text-zinc-500">t</span>
        </h1>
      </motion.div>

      {/* Main Section */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-20">
        <div>
          {cartItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ x: 6 }}
              className="border-t border-zinc-800 py-10"
            >
              <div className="flex flex-col lg:flex-row gap-10">
                {/* Number */}
                <div className="text-5xl font-serif text-zinc-700">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full lg:w-64 h-80 object-cover rounded-xl"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="uppercase tracking-[4px] text-xs text-gray-500">
                      {item.brand}
                    </p>

                    <h3 className="text-3xl lg:text-4xl font-serif mt-3">
                      {item.name}
                    </h3>

                    <div className="flex gap-8 mt-6 text-gray-400">
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-10">
                    {/* Quantity */}
                    <div className="flex items-center border border-zinc-700 rounded-full">
                      <button className="p-3 rounded-full hover:bg-zinc-900 transition duration-300">
                        <FiMinus size={18} />
                      </button>

                      <span className="px-6">{item.quantity}</span>

                      <button className="p-3 rounded-full hover:bg-zinc-900 transition duration-300">
                        <FiPlus size={18} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-8">
                      <p className="text-2xl font-medium">${item.price}</p>

                      <button className="text-gray-500 hover:text-white transition">
                        <GoTrash size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="border border-zinc-800 rounded-3xl p-8 h-fit sticky top-10"
        >
          <div>
            <p className="uppercase tracking-[4px] text-gray-500 text-xs">
              Order Summary
            </p>

            <h2 className="text-3xl font-serif mt-3">Total</h2>
          </div>

          <div className="mt-10 space-y-6">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>$123</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Tax</span>
              <span>$66</span>
            </div>

            <div className="border-t border-zinc-800 pt-6 flex justify-between text-3xl font-semibold">
              <span>Total</span>
              <span>$233</span>
            </div>
          </div>

          <button className="mt-12 w-full bg-white text-black py-4 rounded-full flex items-center justify-center gap-3 hover:bg-zinc-200 transition duration-300" onClick={()=>navigate("/CartOrder")}>
            Checkout
            <GoArrowUpRight size={22} />
          </button>

          <p className="text-center text-sm text-gray-500 mt-8">
            Secure checkout • Free shipping • Easy returns
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Cart;
