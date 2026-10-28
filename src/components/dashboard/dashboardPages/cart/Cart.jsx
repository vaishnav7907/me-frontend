import React from "react";
import { motion } from "motion/react";
import { GoArrowUpRight, GoTrash } from "react-icons/go";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [cartData, setCartData] = useState([]);

  const selectedCartItem = cartData.find((item) => item._id === selectedItemId);

  console.log("selected cart item", selectedCartItem);

  const getCartData = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const getCartDataApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getCartItems`,
        { headers: { Authorization: `Bearer ${userToken}` } },
      );
      console.log("get cart data", getCartDataApi.data.cart.items);
      setCartData(getCartDataApi.data.cart.items);
    } catch (error) {
      console.log(
        "error in get cart data",
        error.response?.data?.message || error.message,
      );
    }
  };

  const removeCartItem = async (itemId) => {
    try {
      const userToken = localStorage.getItem("userToken");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/Me/removeCartItem/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      setCartData((prev) => prev.filter((item) => item._id !== itemId));
      setShowDeleteConfirm(false);
      setSelectedItemId(null);
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to remove product from cart",
      );
    }
  };

  useEffect(() => {
    getCartData();
  }, []);
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
      <div className=" gap-20">
        <div>
          {cartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center border-t border-zinc-800 py-10 text-center">
              <p className="text-sm uppercase tracking-[5px] text-gray-500">
                Your Selection
              </p>

              <h2 className="mt-5 font-serif text-3xl sm:text-4xl">
                Your Cart Is Empty
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
                Discover timeless essentials and find something that reflects
                your style.
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-8 flex items-center gap-3 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Explore Collection
                <GoArrowUpRight size={18} />
              </button>
            </div>
          ) : (
            cartData.map((item, index) => {
              const product = item.product;

              const selectedVariant = product?.variants?.find(
                (variant) =>
                  variant.color?.name?.toLowerCase() ===
                  item.color?.toLowerCase(),
              );

              const selectedSize = selectedVariant?.sizes?.find(
                (sizeData) =>
                  String(sizeData.size).toLowerCase() ===
                  String(item.size).toLowerCase(),
              );

              const image =
                selectedVariant?.color?.mainImage?.url ||
                selectedVariant?.color?.subImages?.[0]?.url ||
                "";

              const price = Number(product?.price) || 0;
              const quantity = Number(item.quantity) || 1;
              const itemTotal = price * quantity;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{ x: 4 }}
                  className="border-t border-zinc-800 py-8 sm:py-10"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                    <div className="hidden pt-1 font-serif text-4xl text-zinc-700 sm:block">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="relative shrink-0">
                      <img
                        src={image}
                        alt={product?.name || "Product"}
                        className="h-80 w-full rounded-xl bg-zinc-900 object-cover sm:h-72 sm:w-56"
                      />

                      {/* <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[2px] text-white backdrop-blur-sm">
                        ME Collection
                      </span> */}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[3px] text-gray-500">
                              {product?.brand?.name ||
                                product?.brandName ||
                                product?.category ||
                                "ME Collection"}
                            </p>

                            <h3 className="mt-3 font-serif text-2xl leading-tight sm:text-3xl">
                              {product?.name || "Product"}
                            </h3>

                            <p className="mt-3 text-sm text-gray-400">
                              SKU: {product?.sku || "Not available"}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedItemId(item._id);
                              setShowDeleteConfirm(true);
                            }}
                            aria-label={`Remove ${product?.name || "product"} from cart`}
                            className="rounded-full border border-zinc-800 p-3 text-gray-500 transition hover:border-red-500/50 hover:text-red-400"
                          >
                            <GoTrash size={19} />
                          </button>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <div className="rounded-lg border border-zinc-800 px-4 py-3">
                            <p className="text-[10px] uppercase tracking-[2px] text-gray-500">
                              Size
                            </p>
                            <p className="mt-1 text-sm font-medium">
                              {item.size}
                            </p>
                          </div>

                          <div className="rounded-lg border border-zinc-800 px-4 py-3">
                            <p className="text-[10px] uppercase tracking-[2px] text-gray-500">
                              Color
                            </p>

                            <div className="mt-2 flex items-center gap-2">
                              <span
                                className="h-4 w-4 rounded-full border border-zinc-600"
                                style={{
                                  backgroundColor:
                                    selectedVariant?.color?.code || "#777777",
                                }}
                              />

                              <span className="text-sm">{item.color}</span>
                            </div>
                          </div>

                          <div className="rounded-lg border border-zinc-800 px-4 py-3">
                            <p className="text-[10px] uppercase tracking-[2px] text-gray-500">
                              Quantity
                            </p>
                            <p className="mt-1 text-sm font-medium">
                              {quantity}
                            </p>
                          </div>

                          <div className="rounded-lg border border-zinc-800 px-4 py-3">
                            <p className="text-[10px] uppercase tracking-[2px] text-gray-500">
                              Availability
                            </p>

                            <p className="mt-1 text-sm font-medium">
                              {!selectedSize
                                ? "Check stock"
                                : selectedSize.stock <= 0
                                  ? "Out of stock"
                                  : selectedSize.stock <= 10
                                    ? "Limited stock"
                                    : "Available"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-zinc-800 pt-5">
                        <div>
                          <p className="text-xs text-gray-500">
                            ₹{price.toLocaleString("en-IN")} × {quantity}
                          </p>

                          <p className="mt-1 text-xs uppercase tracking-[2px] text-gray-500">
                            Item total
                          </p>

                          <p className="mt-2 text-2xl font-medium">
                            ₹{itemTotal.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            navigate("/productInfo", {
                              state: { product: product?._id },
                            })
                          }
                          className="flex items-center gap-2 border-b border-zinc-600 pb-1 text-xs uppercase tracking-[2px] text-gray-300 transition hover:border-white hover:text-white"
                        >
                          order now
                          <GoArrowUpRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
      {showDeleteConfirm && selectedCartItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#111] p-6 sm:p-8"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <GoTrash size={26} />
            </div>

            <h2 className="font-serif text-2xl">Remove Product?</h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Are you sure you want to remove this product from your cart?
            </p>

            {(() => {
              const product = selectedCartItem.product;

              const variant = product?.variants?.find(
                (variant) =>
                  variant.color?.name?.toLowerCase() ===
                  selectedCartItem.color?.toLowerCase(),
              );

              const image =
                variant?.color?.mainImage?.url ||
                variant?.color?.subImages?.[0]?.url ||
                "";

              return (
                <div className="mt-6 flex gap-4 rounded-xl border border-zinc-800 bg-black p-4">
                  <img
                    src={image}
                    alt={product?.name || "Product"}
                    className="h-28 w-24 rounded-lg object-cover"
                  />

                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <h3 className="font-medium">{product?.name}</h3>

                    <p className="mt-2 text-sm text-gray-400">
                      Size: {selectedCartItem.size}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Color: {selectedCartItem.color}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Quantity: {selectedCartItem.quantity}
                    </p>

                    <p className="mt-2 font-semibold">
                      ₹
                      {(
                        (Number(product?.price) || 0) *
                        selectedCartItem.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              );
            })()}

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedItemId(null);
                }}
                className="flex-1 rounded-full border border-zinc-700 py-3 transition hover:bg-zinc-900"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  removeCartItem(selectedCartItem._id);
                  console.log(
                    "selectedcarte item confirm",
                    selectedCartItem._id,
                  );
                }}
                className="flex-1 rounded-full bg-white py-3 text-black transition hover:bg-zinc-200"
              >
                Yes, Remove
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Cart;
