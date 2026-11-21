import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoArrowBack,
  IoCheckmarkCircleOutline,
  IoShieldCheckmarkOutline,
  IoLocationOutline,
  IoCardOutline,
} from "react-icons/io5";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowProduct = location.state?.products;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);
  const [offerDetails, setOfferDetails] = useState(null);
  const [priceDetails, setPriceDetails] = useState(null);
  const [offerLoading, setOfferLoading] = useState(false);

  const totalAmount = buyNowProduct
    ? Number(buyNowProduct.price) * Number(buyNowProduct.quantity)
    : 0;

  const onchangeName = (e) => {
    setName(e.target.value);
  };

  const onchangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onchangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onchangeCity = (e) => {
    setCity(e.target.value);
  };

  const onchangeDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const onchangeState = (e) => {
    setState(e.target.value);
  };

  const onchangePincode = (e) => {
    setPincode(e.target.value);
  };

  useEffect(() => {
    const getOfferPreview = async () => {
      try {
        if (!buyNowProduct) return;

        const productId =
          buyNowProduct.productId || buyNowProduct._id;

        if (!productId || !buyNowProduct.quantity) return;

        setOfferLoading(true);

        const userToken = localStorage.getItem("userToken");

        const response = await axios.post(
          "http://localhost:5900/Me/previewOffer",
          {
            productId,
            quantity: buyNowProduct.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.data.success) {
          setOfferDetails(response.data.offerDetails);
          setPriceDetails(response.data.priceDetails);
        }
      } catch (error) {
        console.error(
          "Error getting offer preview:",
          error.response?.data || error
        );

        setOfferDetails(null);
        setPriceDetails(null);
      } finally {
        setOfferLoading(false);
      }
    };

    getOfferPreview();
  }, [buyNowProduct]);

  const createCheckout = async () => {
    try {
      const userToken = localStorage.getItem("userToken");

      if (!userToken) {
        alert("Please login first");
        return;
      }

      if (!buyNowProduct) {
        alert("Product not found");
        return;
      }

      if (
        !name.trim() ||
        !phone.trim() ||
        !email.trim() ||
        !address.trim() ||
        !city.trim() ||
        !district.trim() ||
        !state.trim() ||
        !pincode.trim()
      ) {
        alert("Please complete the delivery address");
        return;
      }

      if (phone.length !== 10 || isNaN(phone)) {
        alert("Please enter a valid 10-digit phone number");
        return;
      }

      if (pincode.length !== 6 || isNaN(pincode)) {
        alert("Please enter a valid 6-digit pincode");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address");
        return;
      }

      if (!paymentMethod) {
        alert("Please select a payment method");
        return;
      }

      setLoading(true);

      const checkoutData = {
        product: {
          productId: buyNowProduct.productId,
          quantity: buyNowProduct.quantity,
          size: buyNowProduct.size,
          color: {
            name: buyNowProduct.color?.name,
          },
        },

        deliveryAddress: {
          name,
          phone,
          email,
          address,
          city,
          district,
          state,
          pincode,
        },

        paymentMethod,
      };

      const checkoutResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/Checkout`,
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!checkoutResponse.data.success) {
        throw new Error("Unable to create checkout");
      }

      const checkout = checkoutResponse.data.checkout;

      if (!checkout?._id) {
        throw new Error("Checkout ID was not returned by the server");
      }

      if (paymentMethod === "Cash on Delivery") {
        alert("Order placed successfully");
        navigate("/orderSuccess");
        return;
      }

      await handleOnlinePayment(userToken, checkout);
    } catch (error) {
      console.error("Checkout Error:", error);
      console.log("Server response:", error.response?.data);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while creating checkout"
      );

      setLoading(false);
    }
  };

  const handleOnlinePayment = async (userToken, checkout) => {
    try {
      if (!window.Razorpay) {
        alert("Razorpay failed to load");
        setLoading(false);
        return;
      }

      const orderResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/createRazorpayOrder`,
        {
          checkoutId: checkout._id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!orderResponse.data.success) {
        throw new Error("Unable to create Razorpay order");
      }

      const razorpayOrder = orderResponse.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "ME",
        description: buyNowProduct.name,
        order_id: razorpayOrder.id,

        prefill: {
          name,
          email,
          contact: phone,
        },

        theme: {
          color: "#000000",
        },

        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              `${import.meta.env.VITE_API_URL}/Me/verifyRazorpayPayment`,
              {
                checkoutId: checkout._id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              }
            );

            console.log("Payment verification response:", verifyResponse.data);

            if (verifyResponse.data.success) {
              alert("Payment successful");

              navigate("/orderSuccess", {
                replace: true,
              });
            } else {
              alert(
                verifyResponse.data.message ||
                  "Payment verification failed"
              );
            }
          } catch (error) {
            console.error("Payment Verification Error:", error);
            console.log("Server response:", error.response?.data);

            alert(
              error.response?.data?.message ||
                "Payment verification failed"
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.log("Payment failed:", response.error);

        alert(response.error?.description || "Payment failed");

        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      console.log("Server response:", error.response?.data);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to create Razorpay order"
      );

      setLoading(false);
    }
  };

  if (!buyNowProduct) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-md w-full">
          <p className="text-xs tracking-[0.4em] text-white/40 uppercase">
            ME Store
          </p>

          <h1 className="text-2xl sm:text-3xl font-light mt-5">
            No product selected
          </h1>

          <p className="text-white/40 mt-3 text-sm">
            Please select a product before proceeding to checkout.
          </p>

          <button
            onClick={() => navigate("/mainpage")}
            className="mt-8 border border-white px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition"
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full overflow-x-hidden bg-black text-white pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 pt-5 sm:pt-7">

        <button
          className="group flex items-center gap-3 text-white/60 hover:text-white transition"
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          <IoArrowBack className="text-xl transition-transform duration-300 group-hover:-translate-x-2" />
          <span className="uppercase tracking-[0.3em] text-xs">
            Back
          </span>
        </button>

        <div className="mt-9 sm:mt-12 mb-8 sm:mb-10">
          <p className="uppercase tracking-[0.45em] text-white/40 text-[10px] sm:text-xs">
            ME Store
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mt-4 tracking-wide">
            Checkout
          </h1>

          <p className="text-white/40 mt-3 text-xs sm:text-sm">
            Complete your details to place your order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-7 sm:gap-10 lg:gap-12 xl:gap-16">

          <div className="space-y-7 sm:space-y-10 min-w-0">

            <div className="border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full border border-white/15 flex items-center justify-center">
                  <IoLocationOutline className="text-xl" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-light">
                    Delivery Address
                  </h2>

                  <p className="text-white/40 text-[11px] sm:text-xs mt-1">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={onchangeName}
                  disabled={loading}
                  className="w-full min-w-0 bg-white/[0.03] border border-white/10 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm outline-none focus:border-white/50 transition placeholder:text-white/30 disabled:opacity-50"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={onchangePhone}
                    maxLength={10}
                    disabled={loading}
                    className="w-full min-w-0 bg-white/[0.03] border border-white/10 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm outline-none focus:border-white/50 transition placeholder:text-white/30 disabled:opacity-50"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={onchangeEmail}
                    disabled={loading}
                    className="w-full min-w-0 bg-white/[0.03] border border-white/10 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm outline-none focus:border-white/50 transition placeholder:text-white/30 disabled:opacity-50"
                  />
                </div>

                <textarea
                  name="address"
                  placeholder="Full Address / House Name / Street"
                  value={address}
                  onChange={onchangeAddress}
                  rows={4}
                  disabled={loading}
                  className="w-full min-w-0 bg-white/[0.03] border border-white/10 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm outline-none focus:border-white/50 transition placeholder:text-white/30 resize-none disabled:opacity-50"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={city}
                    onChange={onchangeCity}
                    disabled={loading}
                    className="w-full min-w-0 bg-white/[0.03] border border-white/10 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm outline-none focus:border-white/50 transition placeholder:text-white/30 disabled:opacity-50"
                  />

                  <input
                    type="text"
                    name="district"
                    placeholder="District"
                    value={district}
                    onChange={onchangeDistrict}
                    disabled={loading}
                    className="w-full min-w-0 bg-white/[0.03] border border-white/10 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm outline-none focus:border-white/50 transition placeholder:text-white/30 disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={state}
                    onChange={onchangeState}
                    disabled={loading}
                    className="w-full min-w-0 bg-white/[0.03] border border-white/10 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm outline-none focus:border-white/50 transition placeholder:text-white/30 disabled:opacity-50"
                  />

                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={onchangePincode}
                    maxLength={6}
                    disabled={loading}
                    className="w-full min-w-0 bg-white/[0.03] border border-white/10 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm outline-none focus:border-white/50 transition placeholder:text-white/30 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full border border-white/15 flex items-center justify-center">
                  <IoCardOutline className="text-xl" />
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-light">
                    Payment Method
                  </h2>

                  <p className="text-white/40 text-[11px] sm:text-xs mt-1">
                    Choose how you want to pay.
                  </p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("Cash on Delivery")}
                  disabled={loading}
                  className={`w-full min-w-0 border rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left transition duration-300 ${
                    paymentMethod === "Cash on Delivery"
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/[0.02] hover:border-white/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">
                        Cash on Delivery
                      </p>

                      <p
                        className={`text-[11px] sm:text-xs mt-2 ${
                          paymentMethod === "Cash on Delivery"
                            ? "text-black/60"
                            : "text-white/40"
                        }`}
                      >
                        Pay when your order arrives.
                      </p>
                    </div>

                    {paymentMethod === "Cash on Delivery" && (
                      <IoCheckmarkCircleOutline className="text-2xl shrink-0" />
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("Online Payment")}
                  disabled={loading}
                  className={`w-full min-w-0 border rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left transition duration-300 ${
                    paymentMethod === "Online Payment"
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/[0.02] hover:border-white/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">
                        Online Payment
                      </p>

                      <p
                        className={`text-[11px] sm:text-xs mt-2 ${
                          paymentMethod === "Online Payment"
                            ? "text-black/60"
                            : "text-white/40"
                        }`}
                      >
                        Pay securely using Razorpay.
                      </p>
                    </div>

                    {paymentMethod === "Online Payment" && (
                      <IoCheckmarkCircleOutline className="text-2xl shrink-0" />
                    )}
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-2 mt-5 sm:mt-6 text-white/35 text-[11px] sm:text-xs">
                <IoShieldCheckmarkOutline className="text-base shrink-0" />
                <span>Your order details are securely processed.</span>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="lg:sticky lg:top-8">
              <h2 className="text-lg sm:text-xl font-light mb-5 sm:mb-6">
                Order Summary
              </h2>

              <div className="border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7">

                <div className="flex flex-col min-[380px]:flex-row gap-4 sm:gap-5">
                  <img
                    src={buyNowProduct.image}
                    alt={buyNowProduct.name}
                    className="w-full min-[380px]:w-28 sm:w-32 h-48 min-[380px]:h-36 sm:h-40 object-cover rounded-xl bg-white/5"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-light break-words">
                      {buyNowProduct.name}
                    </h3>

                    <p className="text-white/40 text-xs mt-3 sm:mt-4">
                      Color:
                      <span className="text-white/80 ml-2">
                        {buyNowProduct.color?.name}
                      </span>
                    </p>

                    <p className="text-white/40 text-xs mt-2">
                      Size:
                      <span className="text-white/80 ml-2">
                        {buyNowProduct.size}
                      </span>
                    </p>

                    <p className="text-white/40 text-xs mt-2">
                      Quantity:
                      <span className="text-white/80 ml-2">
                        {buyNowProduct.quantity}
                      </span>
                    </p>

                    <p className="text-lg mt-3 sm:mt-4">
                      ₹{Number(buyNowProduct.price).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-6 sm:my-8" />

                <div className="flex justify-between gap-3 text-xs sm:text-sm text-white/50">
                  <span>Product Price</span>
                  <span className="shrink-0">
                    ₹{Number(buyNowProduct.price).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-xs sm:text-sm text-white/50 mt-4 sm:mt-5">
                  <span>Quantity</span>
                  <span>× {buyNowProduct.quantity}</span>
                </div>

                <div className="flex justify-between gap-3 text-xs sm:text-sm text-white/50 mt-4 sm:mt-5">
                  <span>Delivery</span>
                  <span className="text-white">FREE</span>
                </div>

                <div className="h-px bg-white/10 my-6 sm:my-7" />

                <div className="flex justify-between items-center gap-3">
                  <span className="text-base sm:text-lg font-light">
                    Estimated Total
                  </span>

                  <span className="text-xl sm:text-2xl font-light shrink-0">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                <p className="text-[10px] sm:text-[11px] text-white/35 mt-4 leading-relaxed">
                  Final payable amount is calculated and confirmed by the
                  server, including any applicable offers.
                </p>

                {offerLoading ? (
                  <p className="text-sm text-gray-500 mt-4">
                    Checking available offers...
                  </p>
                ) : offerDetails?.offerApplied ? (
                  <div className="mt-4 rounded-lg border border-green-700/30 bg-green-900/10 p-3">
                    <p className="text-sm font-semibold text-green-600 break-words">
                      Offer applied: {offerDetails.title}
                    </p>

                    {offerDetails.discountType === "buy_x_get_y" ? (
                      <>
                        <div className="mt-2 flex justify-between gap-3 text-xs sm:text-sm">
                          <span>Purchased quantity</span>
                          <span>{offerDetails.purchasedQuantity}</span>
                        </div>

                        <div className="mt-2 flex justify-between gap-3 text-xs sm:text-sm text-green-600">
                          <span>Free quantity</span>
                          <span>{offerDetails.freeQuantity}</span>
                        </div>

                        <div className="mt-2 flex justify-between gap-3 text-xs sm:text-sm font-semibold">
                          <span>Total items</span>
                          <span>{offerDetails.totalQuantity}</span>
                        </div>

                        <p className="mt-2 text-xs text-green-600">
                          Buy {offerDetails.buyQuantity} Get {offerDetails.getQuantity} Free
                        </p>
                      </>
                    ) : (
                      <div className="mt-2 flex justify-between gap-3 text-xs sm:text-sm text-green-600">
                        <span>
                          {offerDetails.discountType === "percentage"
                            ? `${offerDetails.discountPercentage}% Discount`
                            : "Discount"}
                        </span>

                        <span className="shrink-0">
                          -₹{priceDetails?.totalDiscount?.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-3 text-xs sm:text-sm text-gray-500">
                    No offer available for this product.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={createCheckout}
                disabled={loading}
                className="w-full mt-5 sm:mt-7 bg-white text-black py-4 px-3 rounded-full text-xs sm:text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-white/85 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Processing...
                  </>
                ) : paymentMethod === "Online Payment" ? (
                  "Proceed to Payment"
                ) : (
                  "Place Order"
                )}
              </button>

              <p className="text-center text-white/30 text-[10px] sm:text-[11px] mt-5 tracking-wide">
                THANK YOU FOR CHOOSING ME
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;