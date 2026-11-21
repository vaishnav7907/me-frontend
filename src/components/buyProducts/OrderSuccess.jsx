import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="text-center w-full max-w-md">
        <IoCheckmarkCircleOutline className="text-5xl sm:text-6xl md:text-7xl mx-auto mb-4 sm:mb-6" />

        <p className="uppercase tracking-[0.25em] sm:tracking-[0.4em] text-white/40 text-xs sm:text-sm">
          ME Store
        </p>

        <h1 className="text-3xl sm:text-4xl font-light mt-3 sm:mt-4">
          Order Successful
        </h1>

        <p className="text-white/50 mt-4 sm:mt-5 leading-6 sm:leading-7 text-sm sm:text-base px-2 sm:px-0">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10">
          <button
            onClick={() => navigate("/mainpage")}
            className="w-full sm:flex-1 border border-white/20 py-3 sm:py-4 px-4 rounded-full hover:bg-white hover:text-black transition text-sm sm:text-base"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="w-full sm:flex-1 bg-white text-black py-3 sm:py-4 px-4 rounded-full hover:bg-gray-200 transition text-sm sm:text-base"
          >
            View Orders
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;