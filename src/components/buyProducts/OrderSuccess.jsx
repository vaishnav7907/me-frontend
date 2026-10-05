import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      {" "}
      <div className="text-center max-w-md">
        {" "}
        <IoCheckmarkCircleOutline className="text-7xl mx-auto mb-6" />{" "}
        <p className="uppercase tracking-[0.4em] text-white/40 text-sm">
          {" "}
          ME Store{" "}
        </p>{" "}
        <h1 className="text-4xl font-light mt-4"> Order Successful </h1>{" "}
        <p className="text-white/50 mt-5 leading-7">
          {" "}
          Thank you for your purchase. Your order has been successfully
          placed.{" "}
        </p>{" "}
        <div className="flex gap-4 mt-10">
          {" "}
          <button
            onClick={() => navigate("/mainpage")}
            className="flex-1 border border-white/20 py-4 rounded-full hover:bg-white hover:text-black transition"
          >
            {" "}
            Continue Shopping{" "}
          </button>{" "}
          <button
            onClick={() => navigate("/profile")}
            className="flex-1 bg-white text-black py-4 rounded-full hover:bg-gray-200 transition"
          >
            {" "}
            View Orders{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
export default OrderSuccess;
