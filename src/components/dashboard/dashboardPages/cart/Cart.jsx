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

  const selectedCartItem = cartData.find(
    (item) => item._id === selectedItemId,
  );

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
    <section className="min-h-screen bg-black text-white px-4 py-24 sm:px-6 sm:py-28 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 sm:mb-16 lg:mb-20"
      >
        <p className="text-xs uppercase tracking-[4px] text-gray-500 sm:text-sm sm:tracking-[6px]">
          Your Selection
        </p>

        <h1 className="mt-3 font-serif text-5xl sm:mt-4 sm:text-6xl lg:text-7xl">
          Car<span className="text-zinc-500">t</span>
        </h1>
      </motion.div>

      <div className="w-full">
        <div>
          {cartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center border-t border-zinc-800 py-12 px-4 text-center sm:py-16">
              <p className="text-xs uppercase tracking-[4px] text-gray-500 sm:text-sm sm:tracking-[5px]">
                Your Selection
              </p>

              <h2 className="mt-5 font-serif text-3xl sm:text-4xl">
                Your Cart Is Empty
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
                Discover timeless essentials and find something that reflects your
                style.
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-8 flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 sm:px-7"
              >
                Explore Collection
                <GoArrowUpRight size={18} />
              </button>
            </div>
          ) : (
            cartData.map((item, index) => {
              const product = item.product;

              console.log("cart product", product);

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

              const brandIcon = product?.brand?.brandIcon?.url;

              console.log("brand image in cart", brandIcon);

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
                  className="border-t border-zinc-800 py-6 sm:py-8 lg:py-10"
                >
                  <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:gap-8">
                    <div className="hidden pt-1 font-serif text-3xl text-zinc-700 lg:block lg:text-4xl">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="relative w-full shrink-0 overflow-hidden rounded-xl sm:max-w-[280px] lg:max-w-none lg:w-56">
                      <img
                        src={image}
                        alt={product?.name || "Product"}
                        className="aspect-[4/5] w-full rounded-xl bg-zinc-900 object-cover sm:aspect-[3/4] lg:h-72 lg:aspect-auto"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 sm:gap-3">
                              {brandIcon && (
                                <img
                                  src={brandIcon}
                                  alt={product.brand.brandName || "Brand"}
                                  className="h-7 w-7 shrink-0 rounded-full border border-zinc-800 bg-white object-contain p-1 sm:h-8 sm:w-8"
                                />
                              )}

                              <p className="break-words text-[10px] uppercase tracking-[2px] text-gray-500 sm:text-xs sm:tracking-[3px]">
                                {product?.brand?.brandName ||
                                  product?.brand?.name ||
                                  product?.brandName ||
                                  product?.category ||
                                  "ME Collection"}
                              </p>
                            </div>

                            <h3 className="mt-3 break-words font-serif text-xl leading-tight sm:text-2xl lg:text-3xl">
                              {product?.name || "Product"}
                            </h3>

                            <p className="mt-2 break-all text-xs text-gray-400 sm:mt-3 sm:text-sm">
                              SKU: {product?.sku || "Not available"}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedItemId(item._id);
                              setShowDeleteConfirm(true);
                            }}
                            aria-label={`Remove ${product?.name || "product"} from cart`}
                            className="shrink-0 rounded-full border border-zinc-800 p-2.5 text-gray-500 transition hover:border-red-500/50 hover:text-red-400 sm:p-3"
                          >
                            <GoTrash size={18} />
                          </button>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
                          <div className="rounded-lg border border-zinc-800 px-3 py-3 sm:px-4">
                            <p className="text-[9px] uppercase tracking-[2px] text-gray-500 sm:text-[10px]">
                              Size
                            </p>
                            <p className="mt-1 text-sm font-medium">
                              {item.size}
                            </p>
                          </div>

                          <div className="rounded-lg border border-zinc-800 px-3 py-3 sm:px-4">
                            <p className="text-[9px] uppercase tracking-[2px] text-gray-500 sm:text-[10px]">
                              Color
                            </p>

                            <div className="mt-2 flex min-w-0 items-center gap-2">
                              <span
                                className="h-3.5 w-3.5 shrink-0 rounded-full border border-zinc-600 sm:h-4 sm:w-4"
                                style={{
                                  backgroundColor:
                                    selectedVariant?.color?.code || "#777777",
                                }}
                              />

                              <span className="truncate text-sm">
                                {item.color}
                              </span>
                            </div>
                          </div>

                          <div className="rounded-lg border border-zinc-800 px-3 py-3 sm:px-4">
                            <p className="text-[9px] uppercase tracking-[2px] text-gray-500 sm:text-[10px]">
                              Quantity
                            </p>
                            <p className="mt-1 text-sm font-medium">
                              {quantity}
                            </p>
                          </div>

                          <div className="rounded-lg border border-zinc-800 px-3 py-3 sm:px-4">
                            <p className="text-[9px] uppercase tracking-[2px] text-gray-500 sm:text-[10px]">
                              Availability
                            </p>

                            <p className="mt-1 text-xs font-medium sm:text-sm">
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

                      <div className="mt-6 flex flex-col gap-5 border-t border-zinc-800 pt-5 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500">
                            ₹{price.toLocaleString("en-IN")} × {quantity}
                          </p>

                          <p className="mt-1 text-[10px] uppercase tracking-[2px] text-gray-500 sm:text-xs">
                            Item total
                          </p>

                          <p className="mt-2 text-2xl font-medium sm:text-3xl">
                            ₹{itemTotal.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            navigate("/productInfo", {
                              state: { product: product },
                            });

                            console.log("product details cart to buy", product);
                          }}
                          className="flex w-full items-center justify-center gap-2 border border-zinc-700 px-5 py-3 text-xs uppercase tracking-[2px] text-gray-300 transition hover:border-white hover:text-white sm:w-auto sm:border-0 sm:border-b sm:px-0 sm:py-1"
                        >
                          Order Now
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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-3 py-6 backdrop-blur-sm sm:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="my-auto w-full max-w-md rounded-2xl border border-zinc-800 bg-[#111] p-4 sm:p-6 lg:p-8"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500 sm:mb-5 sm:h-14 sm:w-14">
              <GoTrash size={24} />
            </div>

            <h2 className="font-serif text-xl sm:text-2xl">
              Remove Product?
            </h2>

            <p className="mt-2 text-xs leading-6 text-gray-400 sm:text-sm">
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
                <div className="mt-5 flex gap-3 rounded-xl border border-zinc-800 bg-black p-3 sm:mt-6 sm:gap-4 sm:p-4">
                  <img
                    src={image}
                    alt={product?.name || "Product"}
                    className="h-24 w-20 shrink-0 rounded-lg object-cover sm:h-28 sm:w-24"
                  />

                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <h3 className="break-words text-sm font-medium sm:text-base">
                      {product?.name}
                    </h3>

                    <p className="mt-1.5 text-xs text-gray-400 sm:mt-2 sm:text-sm">
                      Size: {selectedCartItem.size}
                    </p>

                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                      Color: {selectedCartItem.color}
                    </p>

                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                      Quantity: {selectedCartItem.quantity}
                    </p>

                    <p className="mt-2 text-sm font-semibold sm:text-base">
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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedItemId(null);
                }}
                className="flex-1 rounded-full border border-zinc-700 py-3 text-sm transition hover:bg-zinc-900"
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
                className="flex-1 rounded-full bg-white py-3 text-sm text-black transition hover:bg-zinc-200"
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