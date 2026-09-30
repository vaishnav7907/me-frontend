import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack, IoCheckmarkCircleOutline } from "react-icons/io5";
const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowProduct = location.state?.products;

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
                // value={address.name}
                // onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                // value={address.phone}
                // onChange={handleChange}
                maxLength={10}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
              />

              <input
                type="text"
                name="name"
                placeholder="E-mail"
                // value={address.name}
                // onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
              />
              <textarea
                name="address"
                placeholder="Full Address / House Name / Street"
                // value={address.address}
                // onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition resize-none"
              />
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  //   value={address.city}
                  //   onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
                />
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  //   value={address.district}
                  //   onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
                />
              </div>
              <input
                type="text"
                name="state"
                placeholder="State"
                // value={address.state}
                // onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                // value={address.pincode}
                // onChange={handleChange}
                maxLength={6}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 outline-none focus:border-white transition"
              />
            </div>
            {/* <div className="mt-10">
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
                      <IoCheckmarkCircleOutline className="text-2xl" />
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
                      <IoCheckmarkCircleOutline className="text-2xl" />
                    )}
                  </div>
                </button>
              </div>
            </div> */}
          </div>
          <div>
            <h2 className="text-2xl font-light mb-8"> Order Summary </h2>
            <div className="border border-white/10 rounded-2xl p-6">
              <div className="flex gap-5">
                <img
                  //   src={buyNowProduct.image}
                  //   alt={buyNowProduct.name}
                  className="w-32 h-40 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-xl"> {buyNowProduct.name} </h3>
                  <p className="text-white/50 mt-3">
                    Color:
                    <span className="text-white/80 ml-2">
                      {/* {buyNowProduct.color?.name} */} yelow
                    </span>
                  </p>
                  <p className="text-white/50 mt-1">
                    Size:
                    <span className="text-white/80 ml-2">
                      {/* {buyNowProduct.size} */}l
                    </span>
                  </p>
                  <p className="text-white/50 mt-1">
                    Quantity:
                    <span className="text-white/80 ml-2">1</span>
                  </p>
                  <p className="text-xl mt-5"> 09878 </p>
                </div>
              </div>
              <div className="h-px bg-white/10 my-8" />
              <div className="flex justify-between text-white/60">
                <span>Product Price</span>
                <span> ₹09878 </span>
              </div>
              <div className="flex justify-between text-white/60 mt-4">
                <span>Quantity</span>
                {/* <span> × {buyNowProduct.quantity} </span> */}

                <span>x 1</span>
              </div>
              <div className="flex justify-between text-white/60 mt-4">
                <span>Delivery</span>
                <span className="text-white"> FREE </span>
              </div>
              <div className="h-px bg-white/10 my-6" />
              <div className="flex justify-between text-2xl">
                <span>Total</span> <span> ₹40000 </span>
              </div>
            </div>
            <button className="w-full mt-8 bg-white text-black py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition">
              payment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Checkout;
