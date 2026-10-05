import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack, IoCheckmarkCircleOutline } from "react-icons/io5";
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
  const totalAmount =
    Number(buyNowProduct.price) * Number(buyNowProduct.quantity);

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

  const createCheckout = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      console.log("USER TOKEN:", userToken);

      if (!userToken) {
        alert("Please login first");
        return;
      }

      if (!buyNowProduct) {
        alert("Product not found");
        return;
      }

      if (
        !name ||
        !phone ||
        !email ||
        !address ||
        !city ||
        !district ||
        !state ||
        !pincode
      ) {
        alert("Please complete the delivery address");
        return;
      }

      if (!paymentMethod) {
        alert("Please select a payment method");
        return;
      }

      if (paymentMethod === "Online Payment") {
        await handleOnlinePayment(userToken);
        return;
      }

      
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

        paymentMethod: paymentMethod,
      };

      console.log("Sending checkout data:", checkoutData);

      setLoading(true);

      const createCheckoutApi = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/Checkout`,
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      console.log("Checkout response:", createCheckoutApi.data);

      if (createCheckoutApi.data.success) {
        alert("Order placed successfully");
        navigate("/orderSuccess");
      }
    } catch (error) {
      console.log("Error in create checkout:", error);
      console.log("Server response:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Something went wrong while creating checkout",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOnlinePayment = async (userToken) => {
    try {
      if (!window.Razorpay) {
        alert("Razorpay failed to load");
        return;
      }

      setLoading(true);

      const orderResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/createRazorpayOrder`,
        { amount: totalAmount },
        { headers: { Authorization: `Bearer ${userToken}` } },
      );
      console.log("Razorpay order:", orderResponse.data);
      if (!orderResponse.data.success) {
        alert("Unable to create Razorpay order");
        return;
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
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#000000",
        },

        handler: async (response) => {
          try {
            console.log("Razorpay payment response:", response);

            const verifyResponse = await axios.post(
              `${import.meta.env.VITE_API_URL}/Me/verifyRazorpayPayment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${userToken}` } },
            );

            console.log("Payment verification:", verifyResponse.data);
            if (!verifyResponse.data.success) {
              alert("Payment verification failed");
              return;
            }

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

              paymentMethod: "Online Payment",

              paymentDetails: {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
              },
            };

            console.log("Creating online checkout:", checkoutData);

            const checkoutResponse = await axios.post(
              `${import.meta.env.VITE_API_URL}/Me/Checkout`,
              checkoutData,
              { headers: { Authorization: `Bearer ${userToken}` } },
            );

            console.log("Checkout response:", checkoutResponse.data);

            if (checkoutResponse.data.success) {
              alert("Payment successful");
              navigate("/orderSuccess");
            }
          } catch (error) {
            console.log("Payment verification error:", error);
            console.log("Server response:", error.response?.data);

            alert(
              error.response?.data?.message || "Payment verification failed",
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
      console.log("Razorpay error:", error);
      console.log("Server response:", error.response?.data);

      alert(error.response?.data?.message || "Unable to create Razorpay order");

      setLoading(false);
    }
  };

  if (!buyNowProduct) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">No product selected</p>
          <button
            onClick={() => navigate("/mainpage")}
            className="mt-6 border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white">
      <div className="pl-5 pt-7">
        <button
          className="group flex items-center gap-3"
          onClick={() => navigate(-1)}
        >
          <span className="text-xl transition-transform duration-300 group-hover:-translate-x-2">
            <IoArrowBack />
          </span>
          <span className="uppercase tracking-[0.35em] text-sm">Back</span>
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <p className="uppercase tracking-[0.4em] text-white/40 text-sm">
            ME Store
          </p>
          <h1 className="text-5xl font-light mt-3"> Checkout </h1>
        </div>
        <div className="grid grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-light mb-8">Delivery Address</h2>
            <div className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={onchangeName}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={onchangePhone}
                maxLength={10}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
              />

              <input
                type="text"
                name="name"
                placeholder="E-mail"
                value={email}
                onChange={onchangeEmail}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
              />
              <textarea
                name="address"
                placeholder="Full Address / House Name / Street"
                value={address}
                onChange={onchangeAddress}
                rows={4}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition resize-none"
              />
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={city}
                  onChange={onchangeCity}
                  className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
                />
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  value={district}
                  onChange={onchangeDistrict}
                  className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
                />
              </div>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={state}
                onChange={onchangeState}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={pincode}
                onChange={onchangePincode}
                maxLength={6}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
              />
            </div>
            <div className="mt-10">
              <h2 className="text-2xl font-light mb-6">Payment Method</h2>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("Cash on Delivery")}
                  className={`w-full border rounded-2xl p-5 text-left transition ${paymentMethod === "Cash on Delivery" ? "border-white bg-white text-black" : "border-white/20 hover:border-white/50"}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-lg">Cash on Delivery</p>
                      <p
                        className={`text-sm mt-1 ${paymentMethod === "Cash on Delivery" ? "text-black/60" : "text-white/40"}`}
                      >
                        Pay when your order arrives
                      </p>
                    </div>
                    {paymentMethod === "Cash on Delivery" && (
                      <IoCheckmarkCircleOutline className={`text-2xl `} />
                    )}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("Online Payment")}
                  className={`w-full border rounded-2xl p-5 text-left transition ${paymentMethod === "Online Payment" ? "border-white bg-white text-black" : "border-white/20 hover:border-white/50"}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-lg">Online Payment</p>
                      <p
                        className={`text-sm mt-1 ${paymentMethod === "Online Payment" ? "text-black/60" : "text-white/40"}`}
                      >
                        Pay securely using online payment
                      </p>
                    </div>
                    {paymentMethod === "Online Payment" && (
                      <IoCheckmarkCircleOutline className={`text-2xl `} />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-light mb-8"> Order Summary </h2>
            <div className="border border-white/10 rounded-2xl p-6">
              <div className="flex gap-5">
                <img
                  src={buyNowProduct.image}
                  alt={buyNowProduct.name}
                  className="w-32 h-40 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-xl"> {buyNowProduct.name} </h3>
                  <p className="text-white/50 mt-3">
                    Color:
                    <span className="text-white/80 ml-2">
                      {buyNowProduct.color?.name}
                    </span>
                  </p>
                  <p className="text-white/50 mt-1">
                    Size:
                    <span className="text-white/80 ml-2">
                      {buyNowProduct.size}
                    </span>
                  </p>
                  <p className="text-white/50 mt-1">
                    Quantity:
                    <span className="text-white/80 ml-2">
                      {buyNowProduct.quantity}
                    </span>
                  </p>
                  <p className="text-xl mt-5"> {buyNowProduct.price} </p>
                </div>
              </div>
              <div className="h-px bg-white/10 my-8" />
              <div className="flex justify-between text-white/60">
                <span>Product Price</span>
                <span> ₹{buyNowProduct.price} </span>
              </div>
              <div className="flex justify-between text-white/60 mt-4">
                <span>Quantity</span>
                <span> × {buyNowProduct.quantity} </span>
              </div>
              <div className="flex justify-between text-white/60 mt-4">
                <span>Delivery</span>
                <span className="text-white"> FREE </span>
              </div>
              <div className="h-px bg-white/10 my-6" />
              <div className="flex justify-between text-2xl">
                <span>Total</span> <span> ₹{totalAmount} </span>
              </div>
            </div>
            <button
              type="button"
              onClick={createCheckout}
              disabled={loading}
              className="w-full mt-8 bg-white text-black py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Processing..."
                : paymentMethod === "Online Payment"
                  ? `Pay ₹${totalAmount}`
                  : "Order"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Checkout;
