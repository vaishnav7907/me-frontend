import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { IoArrowBack } from "react-icons/io5";
import pant1 from "../../../../../assets/pants/pants1.jpg";
import pant2 from "../../../../../assets/pants/pants3.webp";
import shirt1 from "../../../../../assets/premiumshirts/premiumshirt1.jpg";
import shirt2 from "../../../../../assets/premiumshirts/premiumshirt2.jpg";
import jacket1 from "../../../../../assets/premjackets/jacket3.webp";
import tshirt1 from "../../../../../assets/tshirts/tshirt1.webp";
const OfferPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const offerData = location.state?.offer;
  console.log("offerData", offerData);

  //   const products = offerData?.products.map((0fferProducts)=>({
  // id: 1,
  //       name: "Classic White Shirt",
  //       image: shirt1,
  //       category: "Shirts",
  //       price: "$79",
  //   }))

  // const products =
  //   offerData?.products?.map((offerProducts, index) => ({
  //     id: offerProducts._id,
  //     name: offerProducts.name,
  //     image: offerProducts.variants?.[0]?.color?.mainImage?.url,
  //     category: offerProducts.category,
  //     price: offerProducts.price,
  //     brand: offerProducts.brand?.name,
    
  //   })) || [];


    const products=  Array.isArray(offerData?.products)? offerData.products : []

  const categories = [
    "All",
    "Shirts",
    "T-Shirts",
    "Pants",
    "Jackets",
    "InnerWear",
    "Shorts",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  const offerStartDate = offerData?.startDate
    ? new Date(offerData.startDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  const offerEndDate = offerData?.endDate
    ? new Date(offerData.endDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

      const handleProductClick = (product) => {
    navigate("/productInfo", {
      state: { product },
    });
  };
  return (
    <section className="bg-black text-white min-h-screen overflow-hidden ">
      <h1 className="absolute top-24 left-0 text-[180px] lg:text-[260px] font-bold text-white/[0.03] uppercase pointer-events-none select-none">
        Offers
      </h1>

      <button
        className="group flex items-center gap-3 absolute top-10 left-7"
        onClick={() => navigate(-1)}
      >
        <span className="text-xl transition-transform duration-300 group-hover:-translate-x-2">
          <IoArrowBack className="transition-transform duration-300 group-hover:-translate-x-1" />
        </span>
        <span className="uppercase tracking-[0.35em] text-sm">Back</span>
      </button>
      <section className="max-w-7xl mx-auto px-6 py-28">
        <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-gray-400">
          {offerStartDate} - {offerEndDate}
        </p>

        <h1 className="mt-6 text-[55px] md:text-[100px] lg:text-[140px] font-black leading-none tracking-tighter">
          {offerData?.discountType === "buy_x_get_y"
            ? `Buy ${offerData.buyQuantity} Get ${offerData.getQuantity}`
            : offerData?.discountType === "percentage"
              ? `${offerData.discountValue}%`
              : `₹${Number(offerData?.discountValue).toLocaleString("en-IN")}`}
        </h1>

        <h2 className="text-4xl md:text-6xl font-light mt-6 uppercase">
          {offerData.title}
        </h2>

        <p className="mt-10 max-w-xl text-gray-400 leading-8">
          {offerData.description}
        </p>
      </section>
      <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-xl border-y border-white/10 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto py-5 no-scrollbar">
            {categories.map((data) => (
              <button
                key={data}
                onClick={() => setSelectedCategory(data)}
                className="relative pb-2"
              >
                <p
                  className={`uppercase tracking-[3px] text-sm transition ${
                    selectedCategory === data
                      ? "text-white"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {data}
                </p>

                {selectedCategory === data && (
                  <motion.div
                    className="w-full h-[2px] left-0 bottom-0 bg-white absolute"
                    layoutId="smooth"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  ></motion.div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 pb-24">

              {filteredProducts.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-28 text-center">
                  <h3 className="text-3xl md:text-5xl font-serif text-neutral-700">
                    Nothing to discover.
                  </h3>

                  <p className="mt-4 text-sm text-gray-500 tracking-wide">
                    No products are available in this category.
                  </p>
                </div>
              ) : (
                filteredProducts.map((product, index) => {

                  const image =
                    product.variants?.[0]?.color?.mainImage?.url ||
                    product.variants?.[0]?.color?.subImages?.[0]?.url ||
                    "";

                  return (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        type: "spring",
                        stiffness: 70,
                        damping: 18,
                        delay: index * 0.08,
                      }}
                      whileHover={{
                        y: -10,
                        transition: {
                          duration: 0.35,
                          ease: "easeOut",
                        },
                      }}
                      onClick={() => handleProductClick(product)}
                      className="group relative overflow-hidden cursor-pointer bg-[#111]"
                    >

                      {/* Product Image */}
                      <div className="overflow-hidden">
                        <img
                          src={image}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-[430px] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-all duration-700 group-hover:from-black group-hover:via-black/60" />

                      {/* Offer Badge */}
                      <span className="absolute top-6 left-6 bg-white text-black px-4 py-2 uppercase tracking-[0.3em] text-[10px]">
                        Exclusive Offer
                      </span>

                      {/* Product Details */}
                      <div className="absolute bottom-7 left-7 right-7 transition-all duration-500 group-hover:-translate-y-2">

                        <p className="uppercase tracking-[0.35em] text-[10px] text-neutral-400">
                          {product.brand?.name || "ME"} /{" "}
                          {product.category}
                        </p>

                        <h3 className="font-serif text-2xl md:text-[30px] mt-3 leading-tight text-white">
                          {product.name}
                        </h3>

                        <div className="mt-6 flex items-center justify-between">
                          <span className="text-lg text-white">
                            ₹{Number(product.price).toLocaleString("en-IN")}
                          </span>

                          <span className="flex items-center gap-2 uppercase tracking-[0.25em] text-[11px] opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-white">
                            View
                            <span className="text-lg">→</span>
                          </span>
                        </div>

                      </div>
                    </motion.div>
                  );
                })
              )}

            </div>
    </section>
  );
};

export default OfferPage;
